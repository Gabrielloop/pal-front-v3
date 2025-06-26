<template>
  <FormContainer title="Confirmer la suppression" v-if="isEditing"
    ><template #fields>
      <input
        v-model="editedName"
        type="text"
        maxlength="100"
        minlenght="3"
        required
        placeholder="Ma liste de livres"
        class="input input-text mb-2 w-full"
      />
      <textarea
        v-model="editedDescription"
        type="text"
        maxlength="255"
        required
        placeholder="Description de la liste"
        class="input input-text dar:k:bg-primary/10 mb-2 w-full dark:bg-white/10"
      />

      <p v-if="error" class="mt-1 text-sm text-red-500">{{ error }}</p> </template
    ><template #actions>
      <Button @click="cancel" :disabled="loading" :loading="loading">
        <template #icon> <AppIcon name="back" class="h-5 w-5" /> </template>
        Annuler</Button
      >
      <Button @click="save" type="submit" :disabled="loading" :loading="loading" variant="valider">
        <template #icon> <AppIcon name="edit" class="h-5 w-5" /> </template>
        {{ loading ? 'Enregistrement...' : 'Enregistrer' }}
      </Button>
    </template>
  </FormContainer>
  <FormContainer title="Confirmer la suppression" v-else-if="confirming"
    ><template #fields>
      La suppression de cette liste est définitive et retirera tous les livres de cette liste. Vous
      ne perderez pas les informations que vous avez ajouter sur ces livres (avis, notes, etc.).
      Voulez-vous vraiment supprimer cette liste ? </template
    ><template #actions>
      <Button @click="confirming = false"
        ><template #icon> <AppIcon name="back" class="h-5 w-5" /> </template> Annuler</Button
      >
      <Button @click="remove" variant="refuser" :loading="loading" :disabled="loading"
        ><template #icon> <AppIcon name="trash" class="h-5 w-5" /> </template>Oui, supprimer</Button
      ></template
    >
  </FormContainer>
  <FormContainer title="Modifier ou supprimer la liste" v-else
    ><template #actions>
      <Button @click="isEditing = true" type="submit" :loading="loading" :disabled="loading">
        <template #icon> <AppIcon name="edit" class="h-5 w-5" /> </template>Editer
      </Button>
      <Button @click="confirmDelete" variant="refuser" :loading="loading" :disabled="loading">
        <template #icon> <AppIcon name="trash" class="h-5 w-5" /> </template>Supprimer
      </Button></template
    >
  </FormContainer>
</template>

<script setup>
import { ref, watch, toRefs } from 'vue'
import { useListStore } from '@/stores/useListStore'
import { useRouter } from 'vue-router'
import AppIcon from '@/components/AppIcon.vue'
import Button from '@/components/ui/Button.vue'
import ActionGroup from '@/components/ui/ActionGroup.vue'
import FormContainer from '@/components/ui/FormContainer.vue'

const props = defineProps({
  name: String,
  description: String,
  listId: Number,
  editable: Boolean,
})

const { name, description, listId } = toRefs(props)
const listStore = useListStore()
const router = useRouter()

const emit = defineEmits(['update'])
const isEditing = ref(false)
const confirming = ref(false)
const loading = ref(false)
const error = ref(null)

const editedName = ref(name.value)
const editedDescription = ref(description.value)

watch(name, (n) => (editedName.value = n))
watch(description, (d) => (editedDescription.value = d))

async function save() {
  if (!editedName.value.trim()) {
    error.value = 'Le nom est requis.'
    return
  }

  error.value = null
  loading.value = true

  const success = await listStore.updateList(listId.value, {
    userlistName: editedName.value.trim(),
    userlistDescription: editedDescription.value.trim(),
  })

  loading.value = false

  if (success) {
    emit('update', {
      name: editedName.value.trim(),
      description: editedDescription.value.trim(),
    })
    isEditing.value = false
  }
}

function cancel() {
  editedName.value = name.value
  editedDescription.value = description.value
  isEditing.value = false
  error.value = null
}

function confirmDelete() {
  confirming.value = true
}

async function remove() {
  loading.value = true
  await listStore.deleteList(listId.value)
  router.push('/listes')
}
</script>
