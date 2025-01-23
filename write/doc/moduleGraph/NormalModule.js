class NormalModule{
    constructor(request){
        this.request=request;
        this.dependencies = new Set();
    }
    addDependency(dependency){
        this.dependencies.add(dependency);
    }

}