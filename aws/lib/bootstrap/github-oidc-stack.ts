import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
import { BaseStack, BaseStackProps } from '../common/base-stack';

export interface GitHubOidcStackProps extends BaseStackProps {
  readonly repositoryConfig: { owner: string; repoName: string; branchFilter?: string }[];
}

export class GitHubOidcStack extends BaseStack {
  readonly deploymentRole: iam.IGrantable;
  constructor(scope: Construct, id: string, props: GitHubOidcStackProps) {
    super(scope, id, props);

    const githubDomain = 'token.actions.githubusercontent.com';

    const ghProvider = new iam.OpenIdConnectProvider(this, `GitHubProvider${props.project}`, {
      url: `https://${githubDomain}`,
      clientIds: ['sts.amazonaws.com'],
    });

    const allowedRepositoryPatterns = props.repositoryConfig.map(r =>
      `repo:${r.owner}/${r.repoName}:${r.branchFilter ?? '*'}`);

    // grant only requests coming from a specific GitHub repository.
    const conditions: iam.Conditions = {
      StringLike: {
        [`${githubDomain}:sub`]: allowedRepositoryPatterns,
      }
    };

    const principal = new iam.WebIdentityPrincipal(ghProvider.openIdConnectProviderArn, conditions);
    const roleName = `GitHubCdkDeployRole${props.project}`;

    const webIdentityRole = new iam.Role(this, roleName, {
      assumedBy: principal,
      description: 'This role is used via GitHub Actions to deploy with AWS CDK or Terraform on the target AWS account',
      maxSessionDuration: cdk.Duration.hours(1),
    });

    const assumeCdkRolePolicy = new iam.Policy(this, `AssumeCdkRolePolicy${props.project}`, {
      statements: [
        new iam.PolicyStatement({
          actions: [
            'sts:AssumeRole',
          ],
          resources: [
            'arn:aws:iam::*:role/cdk-*',
          ],
        }),
      ],
    });

    assumeCdkRolePolicy.attachToRole(webIdentityRole);
    
    new cdk.CfnOutput(this, `${roleName}Arn`, {
      value: webIdentityRole.roleArn,
    });
    this.deploymentRole = webIdentityRole;
  }
}