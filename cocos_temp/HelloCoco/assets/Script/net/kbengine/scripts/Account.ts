import { KBEngine } from "../../../mylibs/libcode";

/*-----------------------------------------------------------------------------------------
												entity
-----------------------------------------------------------------------------------------*/
KBEngine.Account = KBEngine.Entity.extend({
    __init__ : function()
    {
        this._super();
        KBEngine.INFO_MSG("Account __init__");
    }
});