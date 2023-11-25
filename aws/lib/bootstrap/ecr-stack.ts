import { Construct } from 'constructs';
import { BaseStack, BaseStackProps } from '../common/base-stack';
import { Repository } from 'aws-cdk-lib/aws-ecr';
import { RemovalPolicy } from 'aws-cdk-lib';
import { IGrantable } from 'aws-cdk-lib/aws-iam';

export interface EcrStackProps extends BaseStackProps {
  readonly deploymentRole: IGrantable;
}

export class EcrStack extends BaseStack {
  constructor(scope: Construct, id: string, props: EcrStackProps) {
    super(scope, id, props);

    const normalizedRepositoryName = props.project.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '-');

    const repository = new Repository(this, `Repository${props.project}`, {
      autoDeleteImages: true,
      removalPolicy: RemovalPolicy.DESTROY,
      repositoryName: normalizedRepositoryName,
    });

    repository.grantPullPush(props.deploymentRole)
  }
}
