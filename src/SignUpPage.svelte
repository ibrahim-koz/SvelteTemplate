<script lang="ts">
  let isDisabled = false;
  let password;
  let passwordRepeat;
  // eslint-disable-next-line max-len
  const comparePasswordFields = (password:string, passwordRepeat:string) => password === passwordRepeat;

  const onChangePassword = () => {
    isDisabled = comparePasswordFields(password, passwordRepeat);
  };

  const onChangePasswordRepeat = () => {
    isDisabled = comparePasswordFields(password, passwordRepeat);
  };
</script>

<h1>Sign Up</h1>
<label for="username">Username</label>
<input id="username"/>
<label for="e-mail">E-mail</label>
<input id="e-mail"/>
<label for="password">Password</label>
<input bind:value={password} on:input={onChangePassword} id="password" type="password"/>
<label for="password-repeat">Password Repeat</label>
<input bind:value={passwordRepeat} on:input={onChangePasswordRepeat}  id="password-repeat" type="password"/>
<button disabled={isDisabled}>Sign Up</button>
