<template>
  <div class="w-full">
    <CrudForm
      btn-text="Sign up"
      title="Sign Up"
      :fields="fields"
      :validation-schema="signInSchema"
      @on-submit="handleSubmit"
    />
    <p>You already have an account?
      <RouterLink :to="AppRoutes.SIGN_IN">sign in</RouterLink>
    </p>
  </div>
</template>

<script setup lang="ts">
import { fields } from  './data';
import { signInSchema } from '@validation-schemas/index';
import { useAuthStore } from '@/stores/auth';
import { SignUpDto } from '@types-app/auth';
import { AppRoutes } from '@enums/route';
import CrudForm from '@common/crud-form/CrudForm.vue';

const authSotre = useAuthStore();

const handleSubmit = (values: SignUpDto) => authSotre.signUp(values);
</script>