<script setup lang="ts">
import type { FormContext } from 'vee-validate'
import type { ArraySchema, BooleanSchema, DateSchema, Maybe, NumberSchema, StringSchema } from 'yup'
import type { DatePickerProps, InputNumberProps, InputProps, RadioGroupProps, SelectOption, SelectProps } from 'naive-ui'

const props = defineProps<{
  schema: FormSchema
}>()

interface FormItemBase {
  label: string
  placeholder?: string
  span?: number
}

interface FormItemDate extends FormItemBase {
  type: 'date'
  rules?: DateSchema<Maybe<Date>>
  props?: DatePickerProps
}

interface FormItemInput extends FormItemBase {
  type: 'input'
  rules?: StringSchema<Maybe<string>>
  props?: InputProps
}

interface FormItemMultiSelect extends FormItemBase {
  type: 'multi-select'
  options: SelectOption[]
  rules?: ArraySchema<(string | number)[], any>
  creatable?: boolean
  props?: Omit<SelectProps, 'filterable' | 'multiple' | 'tag'>
}

interface FormItemNumber extends FormItemBase {
  type: 'number'
  rules: NumberSchema<Maybe<number>>
  props?: InputNumberProps
}

interface FormItemRadio extends FormItemBase {
  type: 'radio'
  options: {
    label: string
    value: string | number | boolean
  }[]
  rules?: StringSchema<Maybe<string>> | NumberSchema<Maybe<number>> | BooleanSchema<Maybe<boolean>>
  props?: Omit<RadioGroupProps, 'options'>
}

interface FormItemSelect extends FormItemBase {
  type: 'select'
  options: SelectOption[]
  rules?: StringSchema<Maybe<string>> | NumberSchema<Maybe<number>>
  creatable?: boolean
  props?: Omit<SelectProps, 'filterable' | 'multiple' | 'tag'>
}

type FormItem = FormItemDate | FormItemInput | FormItemMultiSelect | FormItemNumber | FormItemRadio | FormItemSelect

export interface FormSchema {
  [key: string]: FormItem
}

const defineComponentBinds = inject<FormContext['defineComponentBinds']>('defineComponentBinds')

const binds = reactive(Object.entries(props.schema).reduce((acc, [key, item]) => {
  acc[key] = defineComponentBinds!(key, state => ({
    model: {
      'date': 'formatted-value',
      'input': 'value',
      'multi-select': 'value',
      'number': 'value',
      'radio': 'value',
      'select': 'value',
    }[item.type],

    props: {
      ...item?.props,
      clearable: item.rules?.spec.optional ?? true,
      placeholder: item.placeholder || '',
      showRequireMark: !item.rules?.spec.optional ?? false,
      feedback: state.touched ? state.errors[0] : undefined,
      validationStatus: state.touched && state.errors[0] ? 'error' : 'default',
    },
  }),
  )
  return acc
}, {} as Record<string, any>))

const span: Record<number, string> = {
  1: 'col-span-1',
  2: 'col-span-2',
  3: 'col-span-3',
  4: 'col-span-4',
  5: 'col-span-5',
  6: 'col-span-6',
  7: 'col-span-6 @2xl:col-span-7',
  8: 'col-span-6 @2xl:col-span-8',
  9: 'col-span-6 @2xl:col-span-9',
  10: 'col-span-6 @2xl:col-span-10',
  11: 'col-span-6 @2xl:col-span-11',
  12: 'col-span-6 @2xl:col-span-12',
}
</script>

<template>
  <n-form-item v-for="[key, item] in Object.entries(schema)" v-bind="binds[key]" :key="key" :class="span[item.span || 6]" :label="item.label">
    <n-date-picker v-if="item.type === 'date'" v-bind="binds[key]" value-format="yyyy-MM-dd" />

    <n-input v-else-if="item.type === 'input'" v-bind="binds[key]" />

    <n-select v-else-if="item.type === 'multi-select'" filterable multiple v-bind="binds[key]" :options="item.options" :tag="item.creatable" />

    <n-input-number v-else-if="item.type === 'number'" v-bind="binds[key]" :show-button="false" />

    <n-radio-group v-else-if="item.type === 'radio'" v-bind="binds[key]">
      <n-space>
        <n-radio v-for="option in item.options" :key="String(option.value)" :label="option.label" :value="option.value" />
      </n-space>
    </n-radio-group>

    <n-select v-else-if="item.type === 'select'" filterable v-bind="binds[key]" :options="item.options" :tag="item.creatable" />
  </n-form-item>
</template>
