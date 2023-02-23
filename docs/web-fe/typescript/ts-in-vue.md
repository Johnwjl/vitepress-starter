
# Use TypeScript in Vue 

### in vue3 

- vue3 本身支持了 ts
- 在单文件组件的`<script>` 标签上加上 `lang="ts"`
- 常用API：
	- defineComponent() （用来支持组件内的ts）
	- `defineProps`来声明组件`props`，并支持使用`泛型接口`来为组件的`props`标注类型
	```vue
	<script setup lang="ts">
		interface Props {
			foo: string
			bar?: number
		}
		const props = defineProps<Props>()
	</script>
	```
	- `withDefaults()`：给`props`设置默认值，并支持为默认值提供类型检查
  
	```vue
	<script setup lang="ts">
		export interface Props {
			msg?: string
			labels?: string[]
		}
		const props = withDefaults(defineProps<Props>(), {
			msg: 'hello',
			labels: () => ['one', 'two']
		})
	</script>
	```

	或者使用 `响应性语法糖` (仍处于试验阶段) 这需要`显式开启`。目前仅vue3支持。
	```vue
	<script setup lang="ts">
		interface Props {
			name: string
			count?: number
		}
		// 对 defineProps() 的响应性解构
		// 默认值会被编译为等价的运行时选项
		const { name, count = 100 } = defineProps<Props>()
	</script>
	```

### In vue 2.7 

- 在vue 2.7 及 vue3 ，我们都可以使用 基于 vue3 的ts 支持


### In vue2

	- 在vue2（< 2.7）当中，我们通过引入 `vue-property-decorator` ，以 `装饰器` 和 `Class 类`的方式 编写基于ts的vue组件