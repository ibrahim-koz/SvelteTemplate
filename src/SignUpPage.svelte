<script lang="ts">
  const isDisabled = false;

  const onChangePassword = () => {

  };

  const onChangePasswordChange = () => {
  };
</script>

<h1>Sign Up</h1>
<label for="username">Username</label>
<input id="username"/>
<label for="e-mail">E-mail</label>
<input id="e-mail"/>
<label for="password">Password</label>
<input id="password" type="password"/>
<label for="password-repeat">Password Repeat</label>
<input id="password-repeat" type="password"/>
<button disabled={isDisabled}>Sign Up</button>
