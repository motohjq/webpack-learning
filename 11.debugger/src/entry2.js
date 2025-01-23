import entry2_sync from './entry2_sync';
import sync_common from './sync_common';
console.log(entry2_sync,sync_common);
import('./entry2_async').then(result=>{
    console.log(result);
})