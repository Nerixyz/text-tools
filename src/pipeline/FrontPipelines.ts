import { FrontPipelineItem, PipelineItem, PipelineItemDirection, PipelineItemType } from '@/pipeline/types';
import { DeflateOptionDescriptors, InflateOptionDescriptors } from '@/pipeline/flate';

function makeItem(type: PipelineItemType, direction: PipelineItemDirection, options: any = {}): PipelineItem {
  return {
    type,
    direction,
    options,
  };
}

function pType(base: number, version: number) {
  return (base << 16) | (version & 0xff);
}

export const FrontPipelines: Array<FrontPipelineItem | FrontPipelineItem[]> = [
  [
    {
      typeId: pType(0, 1),
      name: 'Base64 Encode',
      toItem: () => makeItem(PipelineItemType.Base64, PipelineItemDirection.Encode),
      color: 'red lighten-1',
    },
    {
      typeId: pType(1, 1),
      name: 'Base64 Decode',
      toItem: () => makeItem(PipelineItemType.Base64, PipelineItemDirection.Decode),
      color: 'red darken-1',
    },
  ],
  [
    {
      typeId: pType(2, 1),
      name: 'Hex Encode',
      toItem: () => makeItem(PipelineItemType.Hex, PipelineItemDirection.Encode),
      color: 'pink lighten-1',
    },
    {
      typeId: pType(3, 1),
      name: 'Hex Decode',
      toItem: () => makeItem(PipelineItemType.Hex, PipelineItemDirection.Decode),
      color: 'pink darken-1',
    },
  ],
  [
    {
      typeId: pType(4, 1),
      name: 'Deflate',
      toItem() {
        return makeItem(PipelineItemType.Flate, PipelineItemDirection.Encode, this.options);
      },
      options: { level: 3, raw: false },
      descriptors: DeflateOptionDescriptors,
      color: 'purple lighten-1',
    },
    {
      typeId: pType(5, 1),
      name: 'Inflate',
      toItem() {
        return makeItem(PipelineItemType.Flate, PipelineItemDirection.Decode, this.options);
      },
      options: { raw: false },
      descriptors: InflateOptionDescriptors,
      color: 'purple darken-1',
    },
  ],
  [
    {
      typeId: pType(6, 1),
      name: 'GZip',
      toItem() {
        return makeItem(PipelineItemType.Gzip, PipelineItemDirection.Encode, this.options);
      },
      options: { level: 3, raw: false },
      descriptors: DeflateOptionDescriptors,
      color: 'deep-purple lighten-1',
    },
    {
      typeId: pType(7, 1),
      name: 'GUnZip',
      toItem() {
        return makeItem(PipelineItemType.Gzip, PipelineItemDirection.Decode, this.options);
      },
      options: { raw: false },
      descriptors: InflateOptionDescriptors,
      color: 'deep-purple darken-1',
    },
  ],
  [
    {
      typeId: pType(8, 1),
      name: 'Url Encode',
      toItem: () => makeItem(PipelineItemType.Url, PipelineItemDirection.Encode),
      color: 'indigo lighten-1',
    },
    {
      typeId: pType(9, 1),
      name: 'Url Decode',
      toItem: () => makeItem(PipelineItemType.Url, PipelineItemDirection.Decode),
      color: 'indigo darken-1',
    },
  ],
];
