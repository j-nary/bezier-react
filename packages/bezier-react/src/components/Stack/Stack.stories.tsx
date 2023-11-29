import React, { useState } from 'react'

import type {
  Meta,
  StoryFn,
  StoryObj,
} from '@storybook/react'

import {
  type SemanticNames,
  Typography,
} from '~/src/foundation'

import { LightTheme } from '~/src/foundation/Colors/Theme'

import { range } from '~/src/utils/number'

import {
  Button,
  ButtonSize,
} from '~/src/components/Button'
import { Text } from '~/src/components/Text'

import { HStack } from './HStack'
import { Spacer } from './Spacer'
import {
  Stack,
  type StackProps,
} from './Stack'
import mdx from './Stack.mdx'
import { StackItem } from './StackItem'
import { VStack } from './VStack'
import type { AxisAlignment } from './types'

const meta: Meta<StackProps & {
  containerSize: number
}> = {
  component: Stack,
  parameters: {
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    containerSize: {
      control: {
        type: 'range',
        min: 400,
        max: 1200,
        step: 10,
      },
    },
    direction: {
      control: {
        type: 'radio',
      },
      options: ['horizontal', 'vertical'],
    },
    justify: {
      control: {
        type: 'radio',
      },
      options: ['start', 'center', 'end', 'stretch'],
    },
    align: {
      control: {
        type: 'radio',
      },
      options: ['start', 'center', 'end', 'stretch'],
    },
    spacing: {
      control: {
        type: 'range',
        min: 0,
        max: 32,
        step: 4,
      },
    },
  },
}
export default meta

const randomColor = (): SemanticNames =>
  Object.values(LightTheme)[Math.floor(Math.random() * Object.keys(LightTheme).length)] as SemanticNames
const randomSize = (): number => Math.floor((Math.random() * 240) + 120)

const Item = ({
  fixedSize,
  direction,
}: {
  fixedSize: boolean
  direction: 'horizontal' | 'vertical'
}) => {
  const [color] = useState(() => randomColor())
  const [alignSize] = useState(() => randomSize())

  return (
    <div
      style={{
        width: fixedSize && direction === 'vertical' ? alignSize : '100%',
        height: fixedSize && direction === 'horizontal' ? alignSize : '100%',
        backgroundColor: color,
        borderRadius: '4px',
        boxShadow: 'inset 0 0 1px #c0c0c0',
      }}
    />
  )
}

interface StackPreviewProps {
  containerSize: number

  /* Stack Props */
  direction: 'horizontal' | 'vertical'
  justify: AxisAlignment
  align: AxisAlignment
  spacing: number

  /* Item Props */
  itemJustifies: (AxisAlignment | undefined)[]
  itemAligns: (AxisAlignment | undefined)[]
  itemSizes: (number | undefined)[]
  itemWeights: (number | undefined)[]
  itemGrows: (boolean | undefined)[]
  itemShrinks: (boolean | undefined)[]
  itemMarginBefores: (number | undefined)[]
  itemMarginAfters: (number | undefined)[]
}

const Template: StoryFn<StackPreviewProps> = ({
  containerSize,

  direction,
  justify,
  align,
  spacing,

  itemJustifies,
  itemAligns,
  itemSizes,
  itemWeights,
  itemGrows,
  itemShrinks,
  itemMarginBefores,
  itemMarginAfters,
}: StackPreviewProps) => (
  <>
    <div
      style={{
        border: '1px solid #e0e0e0',
        borderRadius: 4,
        ...(
          direction === 'horizontal'
            ? { width: containerSize, height: 480 }
            : { width: 480, height: containerSize }
        ),
      }}
    >
      <Stack
        direction={direction}
        justify={justify}
        align={align}
        spacing={spacing}
      >
        { range(4)
          .map(i => (
            <StackItem
              key={`item-${i}`}
              justify={itemJustifies[i]}
              align={itemAligns[i]}
              size={itemSizes[i]}
              weight={itemWeights[i]}
              grow={itemGrows[i]}
              shrink={itemShrinks[i]}
              marginBefore={itemMarginBefores[i]}
              marginAfter={itemMarginAfters[i]}
            >
              <Item direction={direction} fixedSize={(align ?? itemAligns[i]) !== 'stretch'} />
            </StackItem>
          )) }
      </Stack>
    </div>
  </>
)

export const Primary: StoryObj<StackPreviewProps> = {
  render: Template,

  args: {
    containerSize: 800,

    direction: 'horizontal',
    justify: 'start',
    align: 'start',
    spacing: 0,

    itemJustifies: [],
    itemAligns: [],
    itemSizes: [120, 240, 180, 120],
    itemWeights: [],
    itemGrows: [],
    itemShrinks: [],
    itemMarginBefores: [],
    itemMarginAfters: [],
  },
}

export const Overview: StoryFn<{}> = () => (
  <VStack style={{ width: '400px' }} spacing={16} align="stretch">
    <StackItem>
      <Text
        as="h3"
        style={{
          border: '1px solid #ccc',
        }}
        typo={Typography.Size24}
        bold
      >
        스택에 대해 더 자세히 알아보세요.
      </Text>
    </StackItem>
    <StackItem>
      <Text
        as="p"
        style={{
          border: '1px solid #ccc',
        }}
        typo={Typography.Size13}
        color="txt-black-darker"
      >
        스택은 flex layout을 서술하는 컴포넌트입니다. 스택과 함께라면 뭐든지 만들 수 있어요. 누가 만들었는지는 모르겠지만, 정말 잘 만든 컴포넌트에요. FormControl과 함께 싸드세요!
      </Text>
    </StackItem>
    <StackItem>
      <div
        style={{
          border: '1px solid #ccc',
        }}
      >
        <Button
          size={ButtonSize.L}
          text="스택에 대해 더 자세히 알아보기"
        />
      </div>
    </StackItem>
  </VStack>
)

export const DirectionHorizontal: StoryObj<{}> = {
  render: () => (
    <HStack
      style={{ width: '720px', height: '60px', border: '1px solid #ffc0c0' }}
      align="stretch"
    >
      <StackItem size={120} style={{ backgroundColor: '#ccc' }}>
        <Text typo={Typography.Size18}>Item 1</Text>
      </StackItem>
      <StackItem size={180} style={{ backgroundColor: '#eee' }}>
        <Text typo={Typography.Size18}>Item 2</Text>
      </StackItem>
      <StackItem size={180} style={{ backgroundColor: '#888' }}>
        <Text typo={Typography.Size18}>Item 3</Text>
      </StackItem>
      <StackItem size={80} style={{ backgroundColor: '#aaa' }}>
        <Text typo={Typography.Size18}>Item 4</Text>
      </StackItem>
    </HStack>
  ),

  name: 'Horizontal stack',
}

export const DirectionVertical: StoryObj<{}> = {
  render: () => (
    <VStack
      style={{ width: '200px', height: '600px', border: '1px solid #ffc0c0' }}
      align="start"
    >
      <StackItem size={120} style={{ width: '80px', backgroundColor: '#ccc' }}>
        <Text typo={Typography.Size18}>Item 1</Text>
      </StackItem>
      <StackItem size={180} style={{ width: '150px', backgroundColor: '#eee' }}>
        <Text typo={Typography.Size18}>Item 2</Text>
      </StackItem>
      <StackItem size={180} style={{ width: '200px', backgroundColor: '#888' }}>
        <Text typo={Typography.Size18}>Item 3</Text>
      </StackItem>
      <StackItem size={80} style={{ width: '120px', backgroundColor: '#aaa' }}>
        <Text typo={Typography.Size18}>Item 4</Text>
      </StackItem>
    </VStack>
  ),

  name: 'Vertical stack',
}

export const AlignmentJustify: StoryObj<{}> = {
  render: () => (
    <VStack align="stretch" spacing={8}>
      <StackItem>
        <Text typo={Typography.Size14}>justify = &quot;start&quot;</Text>
      </StackItem>
      <StackItem>
        <HStack
          style={{
            width: '720px',
            height: '60px',
            border: '1px solid #ffc0c0',
          }}
          justify="start"
          align="stretch"
        >
          <StackItem size={120} style={{ backgroundColor: '#ccc' }}>
            <Text typo={Typography.Size18}>Item 1</Text>
          </StackItem>
          <StackItem size={180} style={{ backgroundColor: '#eee' }}>
            <Text typo={Typography.Size18}>Item 2</Text>
          </StackItem>
          <StackItem size={180} style={{ backgroundColor: '#888' }}>
            <Text typo={Typography.Size18}>Item 3</Text>
          </StackItem>
          <StackItem size={80} style={{ backgroundColor: '#aaa' }}>
            <Text typo={Typography.Size18}>Item 4</Text>
          </StackItem>
        </HStack>
      </StackItem>
      <StackItem marginBefore={16}>
        <Text typo={Typography.Size14}>justify = &quot;center&quot;</Text>
      </StackItem>
      <StackItem>
        <HStack
          style={{
            width: '720px',
            height: '60px',
            border: '1px solid #ffc0c0',
          }}
          justify="center"
          align="stretch"
        >
          <StackItem size={120} style={{ backgroundColor: '#ccc' }}>
            <Text typo={Typography.Size18}>Item 1</Text>
          </StackItem>
          <StackItem size={180} style={{ backgroundColor: '#eee' }}>
            <Text typo={Typography.Size18}>Item 2</Text>
          </StackItem>
          <StackItem size={180} style={{ backgroundColor: '#888' }}>
            <Text typo={Typography.Size18}>Item 3</Text>
          </StackItem>
          <StackItem size={80} style={{ backgroundColor: '#aaa' }}>
            <Text typo={Typography.Size18}>Item 4</Text>
          </StackItem>
        </HStack>
      </StackItem>
      <StackItem marginBefore={16}>
        <Text typo={Typography.Size14}>justify = &quot;end&quot;</Text>
      </StackItem>
      <StackItem>
        <HStack
          style={{
            width: '720px',
            height: '60px',
            border: '1px solid #ffc0c0',
          }}
          justify="end"
          align="stretch"
        >
          <StackItem size={120} style={{ backgroundColor: '#ccc' }}>
            <Text typo={Typography.Size18}>Item 1</Text>
          </StackItem>
          <StackItem size={180} style={{ backgroundColor: '#eee' }}>
            <Text typo={Typography.Size18}>Item 2</Text>
          </StackItem>
          <StackItem size={180} style={{ backgroundColor: '#888' }}>
            <Text typo={Typography.Size18}>Item 3</Text>
          </StackItem>
          <StackItem size={80} style={{ backgroundColor: '#aaa' }}>
            <Text typo={Typography.Size18}>Item 4</Text>
          </StackItem>
        </HStack>
      </StackItem>
    </VStack>
  ),

  name: 'Alignment (justify)',
}

export const AlignmentAlign: StoryObj<{}> = {
  render: () => (
    <VStack align="stretch" spacing={8}>
      <StackItem>
        <Text typo={Typography.Size14}>align = &quot;start&quot;</Text>
      </StackItem>
      <StackItem>
        <HStack
          style={{
            width: '720px',
            height: '80px',
            border: '1px solid #ffc0c0',
          }}
          justify="start"
          align="start"
        >
          <StackItem
            size={120}
            style={{ height: '40px', backgroundColor: '#ccc' }}
          >
            <Text typo={Typography.Size18}>Item 1</Text>
          </StackItem>
          <StackItem
            size={180}
            style={{ height: '60px', backgroundColor: '#eee' }}
          >
            <Text typo={Typography.Size18}>Item 2</Text>
          </StackItem>
          <StackItem
            size={180}
            style={{ height: '50px', backgroundColor: '#888' }}
          >
            <Text typo={Typography.Size18}>Item 3</Text>
          </StackItem>
          <StackItem size={80} style={{ backgroundColor: '#aaa' }}>
            <Text typo={Typography.Size18}>Item 4</Text>
          </StackItem>
        </HStack>
      </StackItem>
      <StackItem marginBefore={16}>
        <Text typo={Typography.Size14}>align = &quot;center&quot;</Text>
      </StackItem>
      <StackItem>
        <HStack
          style={{
            width: '720px',
            height: '80px',
            border: '1px solid #ffc0c0',
          }}
          justify="start"
          align="center"
        >
          <StackItem
            size={120}
            style={{ height: '40px', backgroundColor: '#ccc' }}
          >
            <Text typo={Typography.Size18}>Item 1</Text>
          </StackItem>
          <StackItem
            size={180}
            style={{ height: '60px', backgroundColor: '#eee' }}
          >
            <Text typo={Typography.Size18}>Item 2</Text>
          </StackItem>
          <StackItem
            size={180}
            style={{ height: '50px', backgroundColor: '#888' }}
          >
            <Text typo={Typography.Size18}>Item 3</Text>
          </StackItem>
          <StackItem size={80} style={{ backgroundColor: '#aaa' }}>
            <Text typo={Typography.Size18}>Item 4</Text>
          </StackItem>
        </HStack>
      </StackItem>
      <StackItem marginBefore={16}>
        <Text typo={Typography.Size14}>align = &quot;end&quot;</Text>
      </StackItem>
      <StackItem>
        <HStack
          style={{
            width: '720px',
            height: '80px',
            border: '1px solid #ffc0c0',
          }}
          justify="start"
          align="end"
        >
          <StackItem
            size={120}
            style={{ height: '40px', backgroundColor: '#ccc' }}
          >
            <Text typo={Typography.Size18}>Item 1</Text>
          </StackItem>
          <StackItem
            size={180}
            style={{ height: '60px', backgroundColor: '#eee' }}
          >
            <Text typo={Typography.Size18}>Item 2</Text>
          </StackItem>
          <StackItem
            size={180}
            style={{ height: '50px', backgroundColor: '#888' }}
          >
            <Text typo={Typography.Size18}>Item 3</Text>
          </StackItem>
          <StackItem size={80} style={{ backgroundColor: '#aaa' }}>
            <Text typo={Typography.Size18}>Item 4</Text>
          </StackItem>
        </HStack>
      </StackItem>
      <StackItem marginBefore={16}>
        <Text typo={Typography.Size14}>align = &quot;stretch&quot;</Text>
      </StackItem>
      <StackItem>
        <HStack
          style={{
            width: '720px',
            height: '80px',
            border: '1px solid #ffc0c0',
          }}
          justify="start"
          align="stretch"
        >
          <StackItem
            size={120}
            style={{ height: '40px', backgroundColor: '#ccc' }}
          >
            <Text typo={Typography.Size18}>Item 1</Text>
          </StackItem>
          <StackItem
            size={180}
            style={{ height: '60px', backgroundColor: '#eee' }}
          >
            <Text typo={Typography.Size18}>Item 2</Text>
          </StackItem>
          <StackItem
            size={180}
            style={{ height: '50px', backgroundColor: '#888' }}
          >
            <Text typo={Typography.Size18}>Item 3</Text>
          </StackItem>
          <StackItem size={80} style={{ backgroundColor: '#aaa' }}>
            <Text typo={Typography.Size18}>Item 4</Text>
          </StackItem>
        </HStack>
      </StackItem>
    </VStack>
  ),

  name: 'Alignment (align)',
}

export const Spacing: StoryFn<{}> = () => (
  <HStack
    style={{ width: '720px', height: '80px', border: '1px solid #ffc0c0' }}
    justify="start"
    align="stretch"
    spacing={16}
  >
    <StackItem
      size={120}
      style={{ backgroundColor: '#ccc' }}
    >
      <Text typo={Typography.Size18}>Item 1</Text>
    </StackItem>
    <StackItem
      size={180}
      style={{ backgroundColor: '#eee' }}
    >
      <Text typo={Typography.Size18}>Item 2</Text>
    </StackItem>
    <StackItem
      size={180}
      style={{ backgroundColor: '#888' }}
    >
      <Text typo={Typography.Size18}>Item 3</Text>
    </StackItem>
    <StackItem
      size={80}
      style={{ backgroundColor: '#aaa' }}
      marginBefore={40}
    >
      <Text typo={Typography.Size18}>Item 4</Text>
    </StackItem>
  </HStack>
)

export const Expanded: StoryFn<{}> = () => (
  <HStack
    style={{ width: '720px', height: '80px', border: '1px solid #ffc0c0' }}
    justify="start"
    align="stretch"
  >
    <StackItem
      size={120}
      style={{ backgroundColor: '#ccc' }}
    >
      <Text typo={Typography.Size18}>Item 1</Text>
    </StackItem>
    <StackItem
      size={180}
      style={{ backgroundColor: '#eee' }}
    >
      <Text typo={Typography.Size18}>Item 2</Text>
    </StackItem>
    <StackItem
      grow
      shrink
      weight={1}
      style={{ backgroundColor: '#ffa0a0' }}
    >
      <Text typo={Typography.Size18}>Item 3 (Expanded)</Text>
    </StackItem>
    <StackItem
      size={80}
      style={{ backgroundColor: '#aaa' }}
    >
      <Text typo={Typography.Size18}>Item 4</Text>
    </StackItem>
  </HStack>
)

export const WeightSpacer: StoryObj<{}> = {
  render: () => (
    <HStack
      style={{ width: '720px', height: '80px', border: '1px solid #ffc0c0' }}
      justify="start"
      align="stretch"
    >
      <StackItem size={120} style={{ backgroundColor: '#ccc' }}>
        <Text typo={Typography.Size18}>Item 1</Text>
      </StackItem>
      <Spacer />
      <StackItem size={80} style={{ backgroundColor: '#aaa' }}>
        <Text typo={Typography.Size18}>Item 2</Text>
      </StackItem>
    </HStack>
  ),

  name: 'Spacer',
}

export const WeightFixed: StoryObj<{}> = {
  render: () => (
    <HStack
      style={{ width: '100px', height: '80px', border: '1px solid #ffc0c0' }}
      justify="start"
      align="stretch"
    >
      <StackItem size={80} style={{ backgroundColor: '#ccc' }}>
        <Text typo={Typography.Size18}>Item 1</Text>
      </StackItem>
      <Spacer />
      <StackItem size={80} style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <Text typo={Typography.Size18}>Item 2</Text>
      </StackItem>
    </HStack>
  ),

  name: 'Fix-sized item',
}
