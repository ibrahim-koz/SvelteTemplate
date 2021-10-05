<script lang="ts">
  import axios from 'axios';

  let disabled = true;
  let username;
  let email;
  let password;
  let passwordRepeat;

  $: disabled = (password && passwordRepeat) ? password !== passwordRepeat : true;

  const submit = () => {
    axios.post('/api/1.0/users', {
      username,
      email,
      password,
    });
  };
</script>

<form>
  <h1>Sign Up</h1>
  <label for="username">Username</label>
  <input bind:value={username} id="username" />
  <label for="e-mail">E-mail</label>
  <input bind:value={email} id="e-mail" />
  <label for="password">Password</label>
  <input bind:value={password} id="password" type="password"/>
  <label for="password-repeat">Password Repeat</label>
  <input bind:value={passwordRepeat} id="password-repeat" type="password"/>
  <button {disabled} on:click|preventDefault={submit}>Sign Up</button>
</form>
