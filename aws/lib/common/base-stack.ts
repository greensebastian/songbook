import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";

export interface BaseStackProps extends StackProps {
  readonly project: string;
  readonly environment: string;
}

const projectTagName = 'Project';
const environmentTagName = 'Environment';

export class BaseStack extends Stack {
  constructor(scope: Construct, id: string, props: BaseStackProps) {
    const newTags = props.tags || {};
    newTags[projectTagName] = props.project;
    newTags[environmentTagName] = props.environment;
    super(scope, id, {
      ...props,
      tags: newTags
    });
  }
}