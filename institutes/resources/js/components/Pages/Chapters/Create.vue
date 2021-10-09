<template>
    <div>
        <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
            <h2 class="text-lg font-medium mr-auto">{{ $t('Add New Chapter')}}</h2>
            <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
                <router-link :to="{name: 'chapters'}"
                            class="btn box text-gray-700 dark:text-gray-300 mr-2 flex items-center ml-auto sm:ml-0"
                            ><ArrowLeftCircleIcon class="w-4 h-4 mr-2" />{{ $t('List all chapters')}}
                </router-link>
            </div>
        </div>
        <div class="pos intro-y grid grid-cols-12 gap-5 mt-5">
            <div class="intro-y box col-span-12 lg:col-span-12">
                <div class="p-5">
                    <div class="alert alert-danger show flex items-center mb-2" role="alert" v-if="isErrored">
                        <AlertOctagonIcon class="w-6 h-6 mr-2" />
                        {{ message }}
                    </div>
                    <form @submit.prevent = "submitForm" class="validate-form">
                        <div class="mt-3 ">
                            <label for="update-profile-form-1" class="form-label">{{ $t('Choose subject')}}</label>
                            <TailSelect
                                v-model="form.subject_id"
                                :options="{
                                    search: true,
                                    hideSelected: true,
                                    hideDisabled: true,
                                    multiLimit: 5,
                                    multiShowCount: false,
                                    multiContainer: true,
                                    classNames: 'w-full'
                                }"
                            >
                                <option value="">Select a subject</option>
                                
                                <option v-for="(subject, index) in subjects" 
                                        :key="random(index)"
                                        v-bind:value="index">{{ JSON.parse(subject) }}</option>
                            </TailSelect>
                        </div>
                        <div class="mt-3">
                            <label for="form-name" class="form-label">{{ $t('Label') }}</label>
                            <input id="form-name" 
                                    type="text" 
                                    class="form-control" 
                                    placeholder="Enter label of chapter."
                                    v-model.trim="form.label"
                                    :class="{ 'border-theme-21': submitted && v$.label.$errors.length }"
                                    />
                            <div class="text-theme-21 mt-2" v-for="(error, index) of v$.label.$errors" :key="index">
                                <div class="error-msg">{{ error.$message }}</div>
                            </div>
                        </div>
                        <div class="mt-3">
                            
                            <label for="form-description" class="form-label">{{ $t('Description')}}</label>
                                
                            <div class="mt-3 py-2">
      
                                <editor
                                    id="form-description"
                                    v-model="form.description"
                                    initialValue="<p>Initial editor content</p>"
                                    apiKey="n10p1o42akootxkapivj4ecxefdo4zlaqd0ek0aa47ld9js7"
                                    :init="{
                                        height: 200,
                                        menubar: true,
                                        plugins: [
                                            'advlist autolink lists link image charmap',
                                            'searchreplace visualblocks code fullscreen',
                                            'print preview anchor insertdatetime media',
                                            'paste code help wordcount table',
                                        ],
                                        toolbar:
                                            'undo redo | formatselect | bold italic | \
                                            alignleft aligncenter alignright | \
                                            bullist numlist outdent indent | insert | help | \
                                            tiny_mce_wiris_formulaEditor | tiny_mce_wiris_formulaEditorChemistry',
                                    }"
                                    >
                                </editor>
                            </div>
                                
                            <!-- END: Inbox Content -->
                            <div class="text-theme-21 mt-2" v-for="(error, index) of v$.description.$errors" :key="index">
                                <div class="error-msg">{{ error.$message }}</div>
                            </div>
                        </div>
                        <div class="mt-3 ">
                            <label for="language" class="form-label"
                                >{{ $t('Language or Medium')}}</label
                            >
                            <TailSelect
                                id="language"
                                v-model="form.language_id"
                                :options="{
                                    search: true,
                                    classNames: 'w-full'
                                }"
                            >
                                <option v-for="(language, index) in languages" 
                                        :key="index" 
                                        :value="index">{{ language}}</option>
                                
                            </TailSelect>
                        </div>
                        <div class="mt-3">
                            <label for="chapter-tags" class="form-label">{{ $t('Tags') }}</label>

                            <tag v-model="form.tags" 
                                :inputId="'chapter-tags'"
                                :allowCustom="true"
                                :showCount="true" />
                            
                        </div>
                        <!-- BEGIN: Slide Over Footer -->
                        
                        <div class="text-right w-full bottom-0 mt-3">
                            <router-link :to="{name: 'chapters'}" class="btn btn-outline-secondary w-20 mr-1" >
                                Cancel
                            </router-link>
                            <button type="submit" class="btn btn-primary w-20">
                                Save
                            </button>
                        </div>
                        <!-- END: Slide Over Footer -->
                    </form>
                </div>
                <!-- BEGIN: Post Content -->
                
                
            </div>
            <!-- END: Post Content -->
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex';
import { ref, reactive, computed, onMounted } from 'vue'
import { required, helpers } from '@vuelidate/validators'

import Tag from '@/components/inputs/Tag.vue';

import useCrud from '@/hooks/crud.js'
import Editor from "@tinymce/tinymce-vue";
export default {
    components: {
        Tag,
        editor: Editor,
    },
    setup(props, context) {
        const store = useStore();
        
        const form = reactive({
            id: '',
            label: '',
            description: null,
            icon: '',
            tags: [],
            language_id: 1,
            subject_id: '',
        });
        const initialState = {
            id: '',
            label: '',
            description: null,
            icon: '',
            tags: [],
            language_id: 1,
            subject_id: '',
        };

        const rules = computed(() => {
            return {
                label: {
                    required: helpers.withMessage('Please enter label of subject.', required),
                },
                description: {
                    required: helpers.withMessage('Please enter description of subject.', required),
                },
                icon: {
                    required: helpers.withMessage('Please enter icon of subject.', required),
                },
            }
        });

        const options = {
            initialState,
            form,
            rules,
            create: 'chapters/create',
            update: 'chapters/update',
            moduleName: 'Chapter(s)'
        }
        const {
            submitted,
            isLoading,
            isErrored,
            message,
            submit,
            v$,
            editItem,
            editMode,
            clearForm} = useCrud(options);

        // After items are fetched, we have to get all the course types using gettters
        const subjects = computed(function () {
            return store.getters['chapters/subjects'];
        });

        const languages = computed(function() {
            return store.getters['chapters/languages'];
        });

        return {
            form,
            rules,
            submitted,
            isLoading,
            isErrored,
            message,
            submit,
            v$,
            editItem,
            editMode,
            clearForm,
            subjects,
            languages
        }
    },
    methods: {
        random(string) {
            var s = '';
            var randomchar = function() {
                var n = Math.floor(Math.random() * 62);
                if (n < 10) return n; //1-10
                if (n < 36) return String.fromCharCode(n + 55); //A-Z
                return String.fromCharCode(n + 61); //a-z
            }
            while (s.length < string) s += randomchar();
            return s;
        }
    },
}
</script>

<style>

</style>