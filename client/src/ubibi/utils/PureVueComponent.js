

export function installStateLessComponent(templates){
    for (var id in templates) {
        if (templates.hasOwnProperty(id)) {
            var template = templates[id];
            if (typeof template === 'string') {
                Vue.component(id, {
                    template: template
                });
            } else {
                var templateString = template.content;
                var propsMap = template.propsMap;
                var props = propsMap['props'] || '';
                var propsArray = props.split(',');
                Vue.component(id, {
                    template: templateString,
                    props: propsArray,
                    methods:{
                        onClick:function(obj){
                            this.$emit('click',obj);
                        }
                    }
                });
            }
        }
    }
}

