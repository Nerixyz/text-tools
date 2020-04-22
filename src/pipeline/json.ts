import { FrontPipelineItemDescriptors, PipelineData, PipelineItemDirection } from '@/pipeline/types';
import { expectString } from '@/pipeline/utilities';

export default function(input: PipelineData, direction: PipelineItemDirection, options: {
  tabWidth?: number,
} = {}) {
  if (direction === PipelineItemDirection.Encode) {
    return JSON.stringify(JSON.parse(expectString(input)));
  } else {
    return JSON.stringify(JSON.parse(expectString(input)), null, options.tabWidth ?? 2);
  }
}

export const JsonOptionDescriptors: FrontPipelineItemDescriptors = {
  tabWidth: { type: 'number', display: 'Tab Width', steps: true, range: [1, 8] },
};
