exports.items = {
    header: 'header',
    main: 'main'
};
exports.store = {
    models: {
        tab: { data: '1' }
    },
    callbacks:{
        tab:function(payload){
            var {tab}=this.models,
                name=tab.data
            if(+name){
                tab.set('0',true)
            }else{
                tab.set('1',true)
            }
        }
    }
}


