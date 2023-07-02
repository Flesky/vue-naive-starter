import type { FormItemRule, SelectOption } from 'naive-ui'

interface FormItem {
  label: string
  placeholder?: string
  required?: boolean
  span?: number
  rules?: FormItemRule | FormItemRule[]
}

interface FormSpace {
  type: 'space'
  span?: number
}

interface FormItemCheckbox extends Omit<FormItem, 'label' | 'placeholder'> {
  label?: string
  type: 'checkbox'
  content: string
}

interface FormItemInput extends FormItem {
  type: 'input'
}

interface FormItemNumber extends FormItem {
  type: 'number'
}

interface FormItemSelect extends FormItem {
  type: 'select'
  options: SelectOption[]
}

type FormItems = FormSpace | FormItemCheckbox | FormItemInput | FormItemNumber | FormItemSelect

export interface FormSchema {
  [path: string]: FormItems
}
