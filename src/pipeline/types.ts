import { Buffer } from 'buffer';

export type PipelineItem = {
  type: PipelineItemType;
  direction: PipelineItemDirection;
  options: any;
};

export enum PipelineItemDirection {
  Encode,
  Decode,
}

export enum PipelineItemType {
  Base64 = 'base64',
  Hex = 'hex',
  Flate = 'flate',
  Gzip = 'gzip',
}

export type PipelineData = Buffer | string;

export type FrontPipelineItemDescriptor = { display: string } & (
  | {
      type: 'boolean';
    }
  | { type: 'number'; steps?: boolean; range: [number, number] }
);
export type FrontPipelineItemDescriptors = { [x: string]: FrontPipelineItemDescriptor };

export type FrontPipelineItem = {
  typeId: number;
  id?: number;
  name: string;
  hasOptions?: boolean;
  options?: {};
  toItem: () => PipelineItem;
  descriptors?: FrontPipelineItemDescriptors;
};
