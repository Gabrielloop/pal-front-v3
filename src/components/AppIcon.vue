<template>
    <component
    :is="iconComponent"
    v-bind="$attrs"
    class="w-5 h-5"
    />
</template>

<script setup>
import {BookOpenIcon,
  HeartIcon,
  StarIcon,
  MagnifyingGlassIcon,
  UserIcon,
  TrashIcon,
  PencilIcon} from '@heroicons/vue/24/outline'


const props = defineProps({
  name: {
    type: String,
    required: true
  }
})


const icons = {
  book: BookOpenIcon,
  heart: HeartIcon,
  star: StarIcon,
  search: MagnifyingGlassIcon,
  user: UserIcon,
  trash: TrashIcon,
  edit: PencilIcon
}

const iconComponent = icons[props.name] || BookOpenIcon

</script>