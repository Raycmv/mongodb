const message = {
    title: null,
    content: null,
    class: 'redbox',
    resetObj : function (){
        this.title = null;
        this.content = null;
        this.class = 'redbox';
    },
    changeObj : function (tit,cnt,cls='redbox'){
        this.title = tit;
        this.content = cnt;
        this.class = cls;
    }
};

module.exports = message;