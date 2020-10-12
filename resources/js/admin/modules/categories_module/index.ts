
import FormListeners from "./form/FormListeners";
import ListListeners from "./list/listeners/list_listeners/ListListeners";
import ListControlsListeners from "./list/listeners/list_listeners/ListControlsListeners";

/*
*  Categories form ==========================
*
* */
// @ts-ignore
CKEDITOR.replace('ckeditor_text',{
    customConfig: '../ckeditor/custom_config.js'
})
new FormListeners()
new ListListeners()
new ListControlsListeners()




/*
* Categories form end ===========================================================
* */

