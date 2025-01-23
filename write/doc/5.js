let util = require('util');
class Chunk {
    constructor(name) {
        this.name = name;
        this._groups = new Set();
    }
}
class ChunkGraphChunk {
    constructor() {
        this.modules = new Set();
    }
}
class ChunkGroup {
    constructor(name) {
        this.name = name;
        this.chunks = new Set();
        this._children = new Set();
        this._parents = new Set();
    }
}
//入口级的代码块分组，也就是里面包含入口代码块
class EntryPoint extends ChunkGroup {
    constructor(name) {
        super();
    }
}
class NormalModule {
    constructor(id) {
        this.id = id;
    }
}
class ChunkGraph {
    constructor() {
        this.chunks = new Map();
    }
}
let chunkGraph = new ChunkGraph();
//创建entry1 chunk
let entry1Chunk = new Chunk('entry1');
//创建entry1ChunkGraphChunk，里面会记录此chunk时有哪些模块
let entry1ChunkGraphChunk = new ChunkGraphChunk();
//创建entry1 chunkGroup
let entry1EntryPoint = new EntryPoint('entry1');
//创建四个模块
let entry1Module = new NormalModule('./src/entry1.js');
let entry1SyncModule = new NormalModule('./src/entry1_sync.js');
let entry1SyncSyncModule = new NormalModule('./src/entry1_sync_sync.js');
let syncCommonModule = new NormalModule('./src/sync_common.js');
//把模块添加到entry1ChunkGraphChunk
entry1ChunkGraphChunk.modules.add(entry1Module);
entry1ChunkGraphChunk.modules.add(entry1SyncModule);
entry1ChunkGraphChunk.modules.add(entry1SyncSyncModule);
entry1ChunkGraphChunk.modules.add(syncCommonModule);
//建立chunkGroup和chunk之间的相互关系
entry1EntryPoint.chunks.add(entry1Chunk);
entry1Chunk._groups.add(entry1EntryPoint);
//记录chunk和entry1ChunkGraphChunk的关系
chunkGraph.chunks.set(entry1Chunk, entry1ChunkGraphChunk);

let entry2Chunk = new Chunk('entry2');
let entry2ChunkGraphChunk = new ChunkGraphChunk();
let entry2EntryPoint = new EntryPoint('entry2');
let entry2Module = new NormalModule('./src/entry2.js');
let entry2SyncModule = new NormalModule('./src/entry2_sync.js');
let entry2SyncSyncModule = new NormalModule('./src/entry2_sync_sync.js');
entry2ChunkGraphChunk.modules.add(entry2Module);
entry2ChunkGraphChunk.modules.add(entry2SyncModule);
entry2ChunkGraphChunk.modules.add(entry2SyncSyncModule);
entry2ChunkGraphChunk.modules.add(syncCommonModule);
entry2EntryPoint.chunks.add(entry2Chunk);
entry2Chunk._groups.add(entry2EntryPoint);
chunkGraph.chunks.set(entry2Chunk, entry2ChunkGraphChunk);

let entry1AsyncChunk = new Chunk('entry1_async');
let entry1AsyncChunkGraphChunk = new ChunkGraphChunk();
let entry1AsyncModule = new NormalModule('./src/entry1_async.js');
let entry1AsyncSyncModule = new NormalModule('./src/entry1_async_sync.js');
entry1AsyncChunkGraphChunk.modules.add(entry1AsyncModule);
entry1AsyncChunkGraphChunk.modules.add(entry1AsyncSyncModule);
let entry1AsyncChunkGroup = new ChunkGroup('entry1_async');
entry1AsyncChunkGroup.chunks.add(entry1AsyncChunk);
entry1AsyncChunkGroup._parents.add(entry1EntryPoint);
entry1EntryPoint._children.add(entry1AsyncChunkGroup);
entry1AsyncChunk._groups.add(entry1AsyncChunkGroup);
chunkGraph.chunks.set(entry1AsyncChunk, entry1AsyncChunkGraphChunk);

let entry2AsyncChunk = new Chunk('entry2_async');
let entry2AsyncChunkGraphChunk = new ChunkGraphChunk();
let entry2AsyncModule = new NormalModule('./src/entry2_async.js');
let entry2AsyncSyncModule = new NormalModule('./src/entry2_async_sync.js');
entry2AsyncChunkGraphChunk.modules.add(entry2AsyncModule);
entry2AsyncChunkGraphChunk.modules.add(entry2AsyncSyncModule);
let entry2AsyncChunkGroup = new ChunkGroup('entry2_async');
entry2AsyncChunkGroup.chunks.add(entry2AsyncChunk);
entry2AsyncChunkGroup._parents.add(entry2EntryPoint);
entry2EntryPoint._children.add(entry2AsyncChunkGroup);
entry2AsyncChunk._groups.add(entry2AsyncChunkGroup);
chunkGraph.chunks.set(entry2AsyncChunk, entry2AsyncChunkGraphChunk);

//
let commonChunk = new Chunk('common');
let commonChunkGraphChunk = new ChunkGraphChunk();
commonChunkGraphChunk.modules.add(syncCommonModule);
commonChunk._groups.add(entry1EntryPoint);
commonChunk._groups.add(entry2EntryPoint);
entry1EntryPoint.chunks.add(commonChunk);
entry2EntryPoint.chunks.add(commonChunk);
entry1ChunkGraphChunk.modules.delete(syncCommonModule);
entry2ChunkGraphChunk.modules.delete(syncCommonModule);
chunkGraph.chunks.set(commonChunk, commonChunkGraphChunk);

console.log(util.inspect(chunkGraph, true, Infinity));