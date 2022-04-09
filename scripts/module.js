import { TJSDocument } from '@typhonjs-fvtt/runtime/svelte/application'

Hooks.once("ready", () => {
    ui.notifications.notify("Change is Good loaded.");

    const api = {

    CiGUpdate: (source, change) => {
        const doc = new TJSDocument(source)
     
        doc.subscribe(async (source, options) =>
        {
           if (options.action === 'update')
           {
               change;
           }
           });

        }
    };

    Object.freeze(api);

    game.modules.get('change-is-good').api = api;
});