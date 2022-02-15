<script>
  import { Router, Route } from 'svelte-routing';
  import Home from './pages/Home.svelte';
  import Error404 from './pages/Error404.svelte';

  export let url = ''; // This property is necessary declare to avoid ignore the Router
</script>

<Router {url}>
  <Route path="/" component={Home} />
  <Route component={Error404} />
</Router>
