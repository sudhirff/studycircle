<template>
    <div>
        <h2 class="intro-y text-lg font-medium mt-10">Users List</h2>
        <div class="grid grid-cols-12 gap-6 mt-5">
            <div class="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2">
                <div class="text-center">
                    <a href="javascript:;" 
                        @click="createUserForm('CreateUser')"
                        class="btn btn-primary"
                        >
                        Add New User
                    </a>
                </div>
            </div>
        </div>
        <div class="intro-y col-span-12 overflow-auto lg:overflow-visible">
            <div v-if="isLoading" class="col-span-6 sm:col-span-3 xl:col-span-2 flex flex-col justify-center items-center">
                <LoadingIcon :icon="'ball-triangle'" />
            </div>
            <p v-else-if="!isLoading && (users && users.length === 0)">Sorry, there are no users yet.</p>
            <table v-else class="table table-report -mt-2">
                <thead>
                    <tr>
                        <th class="whitespace-nowrap">ID</th>
                        <th class="whitespace-nowrap">NAME</th>
                        <th class="whitespace-nowrap">EMAIL</th>
                        <th class="whitespace-nowrap">MOBILE</th>
                        <th class="text-center whitespace-nowrap">ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users" :key="user" class="intro-x">
                        <td  class="w-40">{{ user.id }}</td>
                        <td>{{ user.name }}</td>
                        <td>{{ user.email }}</td>
                        <td class="w-40">{{ user.mobile_no }}</td>
                        <td class="table-report__action w-56">
                            <div class="flex justify-center items-center">
                                <EditBtn module-name="User"
                                        :dialog-id="`edit-dialog-id-`+user.id"
                                        :actionName="`editUser`"
                                        :item="user.id"
                                        :modalHeader = "`Edit User`">

                                    <EditUser :userId="user.id"></EditUser>

                                </EditBtn>
                                <DeleteBtn module-name="User"
                                           :dialog-id="`delete-dialog-id-`+user.id"
                                           :actionName="`deleteUser`"
                                           :item="user" />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- BEGIN: Create User form -->
     
        <teleport to='#app'>
            <component v-if="selectedComponent !== ''" :is="selectedComponent"></component>
        </teleport>
        <!-- END: Create User form -->
    </div>
</template>

<script>
import {mapGetters} from 'vuex'

import CreateUser from '@/components/Pages/Users/Create'
import EditUser from '@/components/Pages/Users/Edit'
import RowCard from '@/components/shared/RowCard'
import DeleteBtn from '@/components/shared/DeleteBtn'
import EditBtn from '@/components/shared/EditBtn'

export default {
    components: {
        CreateUser,
        EditUser,
        RowCard,
        DeleteBtn,
        EditBtn
    },
    props: {
        headings: {
            type: Array,
            default: [],
            required: false,
        },
    },
    data() {
        return {
            headers: [],
            selectedComponent: '',
            isLoading: false
        }
    },
    methods: {
        setSelectedComponent(comp)
        {
            this.selectedComponent = comp
        },
        createUserForm(comp)
        {
            this.selectedComponent = comp
            if (document.getElementById('create-user') != undefined) {
                cash("#create-user").modal("show");
            }
            
        },
    },
    mounted() {
        this.isLoading = true;
        this.$store.dispatch({
            type: 'userModule/fetchUsers',
        });
        this.isLoading = false;
    },
    computed: {
        ...mapGetters('userModule', ['users'])
    }

}
</script>

<style>

</style>