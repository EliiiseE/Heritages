<script>
  import { Router, Route } from 'svelte-routing';
  import Home from './pages/Home.svelte';
  import Error404 from './pages/Error404.svelte';
  import Credit from './pages/Credit.svelte';
  import Instruction from './pages/Instruction.svelte';
  import Story from './pages/Story.svelte';

  export let url = '';

  const startAudio = () => {
    const audio = new Audio('static/audio/soundtrack.mp3');
    audio.volume = 0.5;
    audio.loop = true;
    audio.play();
  };
</script>

<Router {url}>
  <Route path="/"><Home onClick={startAudio} /></Route>
  <Route path="credit" component={Credit} />
  <Route path="instruction" component={Instruction} />
  <Route path="story" component={Story} />
  <Route component={Error404} />
</Router>
