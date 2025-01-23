import entry1_sync from './entry1_sync';
import sync_common from './sync_common';
console.log(entry1_sync,sync_common);
import('./entry1_async').then(result=>{
    console.log(result);
})