#!/usr/bin/env node
import 'source-map-support/register';
import { App } from 'aws-cdk-lib';
import { GitHubOidcStack } from '../lib/bootstrap/github-oidc-stack';
import { EcrStack } from '../lib/bootstrap/ecr-stack';
import { BaseStackProps } from '../lib/common/base-stack';

const app = new App();

const baseProps = getConfig().baseProps;

const githubOidc = new GitHubOidcStack(app, `GitHubStack`, {
  ...baseProps,
  repositoryConfig: [
    {
      owner: 'greensebastian',
      repoName: 'songbook',
    }
  ]
})

new EcrStack(app, `EcrStack`, {
  ...baseProps,
  deploymentRole: githubOidc.deploymentRole,
})

function getConfig(): { baseProps: BaseStackProps } {
  const configName = ensureString(app.node.tryGetContext('config'), 'config');
  const config = app.node.tryGetContext(configName);
  return {
    baseProps: {
      project: ensureString(config['project'], 'project'),
      environment: ensureString(config['environment'], 'environment'),
    }
  }
}

function ensureString(input: any, propName: string): string {
  if (!!input && (typeof input === 'string' || input instanceof String)) return input as string;

  throw new Error(`Value of required context key "${propName}" is not a valid string`);
}