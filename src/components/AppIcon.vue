<template>
  <component :is="iconComponent" v-bind="$attrs" class="h-5 w-5" />
</template>

<script setup>
import {
  BookOpenIcon,
  HeartIcon,
  StarIcon,
  MagnifyingGlassIcon,
  UserIcon,
  TrashIcon,
  PencilIcon,
  ArrowRightStartOnRectangleIcon,
  ArrowLeftEndOnRectangleIcon,
  AdjustmentsHorizontalIcon,
  ChevronLeftIcon,
  HomeIcon,
  ListBulletIcon,
  ShoppingCartIcon,
  CheckCircleIcon,
  LockClosedIcon,
} from '@heroicons/vue/24/outline'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
})

const icons = {
  book: BookOpenIcon,
  heart: HeartIcon,
  star: StarIcon,
  search: MagnifyingGlassIcon,
  user: UserIcon,
  trash: TrashIcon,
  edit: PencilIcon,
  out: ArrowRightStartOnRectangleIcon,
  in: ArrowLeftEndOnRectangleIcon,
  options: AdjustmentsHorizontalIcon,
  back: ChevronLeftIcon,
  home: HomeIcon,
  list: ListBulletIcon,
  cart: ShoppingCartIcon,
  check: CheckCircleIcon,
  lock: LockClosedIcon,
}

const iconComponent = icons[props.name] || BookOpenIcon
</script>
