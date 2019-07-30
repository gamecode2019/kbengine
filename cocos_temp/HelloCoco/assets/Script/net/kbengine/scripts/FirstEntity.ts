import { KBEngine } from "../../../mylibs/libcode";

/*-----------------------------------------------------------------------------------------
												entity
-----------------------------------------------------------------------------------------*/
KBEngine.FirstEntity = KBEngine.Entity.extend({
    __init__ : function()
    {
        this._super();
        KBEngine.INFO_MSG("FirstEntity __init__::",this);
        if(this.isPlayer()) {
            if(window['wx'] != undefined)
                this.decodeEncryptedData();
                KBEngine.Event.fire("onEnterScene");
        }
        this.cellCall('say',"hello world?????????????????");
        // entity.baseCall("base_func", 1, "arg2", "argN")
			// entity.cellCall("cell_func", 1, "arg2", "argN")
    },
    onEnter:function(){
        KBEngine.INFO_MSG("FirstEntity onEnter");
    },
    onSay : function(info)
    {
        KBEngine.INFO_MSG("FirstEntity onSay:",info);
    },
});