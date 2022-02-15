<script>
  import { Router, Route } from 'svelte-routing';
  import Home from './pages/Home.svelte';
  import Error404 from './pages/Error404.svelte';
  import Credit from './pages/Credit.svelte';
  import Instruction from './pages/Instruction.svelte';
  import Story from './pages/Story.svelte';

  export let url = '';
</script>

<Router {url}>
  <Route path="/" component={Home} />
  <Route path="credit" component={Credit} />
  <Route path="instruction" component={Instruction} />
  <Route path="story" component={Story} />
  <Route component={Error404} />
</Router>
