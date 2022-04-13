import { TJSDocument } from '@typhonjs-fvtt/runtime/svelte/store'

/* Old init file contents.
import BasicApplication from './view/BasicApplication.js';

Hooks.once('ready', () => new BasicApplication().render(true, { focus: true }));
*/


Hooks.on("init", () => {    
    game.settings.register('fvtt-change-is-good', 'sync-jobs', {
    name: 'List of Sync Jobs',
    hint: 'A list of paired IDs for sync functions to run at the start at the world.',
    scope: 'world',     
    config: false,       
    type: Array,
    default: [],       
    filePicker: false, 
    })
});


Hooks.once("ready", () => {

    const api = {
        // Proficiency is a calculated stat, so this actually changes the CR to be equal of whoever is the source.
        CiGSyncProfActor2NPC: async (actorID, npcID)  =>  {
            let actorSource = await game.actors.get(actorID);
            let target = await game.actors.get(npcID);
    
            console.log(`Change is Good | Triggered ProfActor2Sync for the actor ${actorSource.name} and ${target.name}`)
    
            let newSettings = game.settings.get('fvtt-change-is-good','sync-jobs');
            if (Array.isArray(newSettings))
            {
            // Protect from adding duplicate entries to an existing array. 
            if (!newSettings.find((entry) => entry.actorID === actorID && entry.npcID === npcID))
            {
                newSettings.push({ actorID, npcID });
            }
            }
            else
            {
            newSettings = [{ actorID, npcID }];
            }
            game.settings.set('fvtt-change-is-good','sync-jobs', newSettings); 
    
    
    
            const doc = new TJSDocument(actorSource)
        
            doc.subscribe(async (actorSource, options) =>
            {
            if (options.action === 'update' || options.renderContext === 'updateItem')
            {
                console.log("Change is Good | The source prof is currently " + actorSource.data.data.attributes.prof);
                console.log("Change is Good | The target prof is currently " + target.data.data.attributes.prof);
    
                    if (actorSource.data.data.attributes.prof != target.data.data.attributes.prof)
                    {
                        let classLevels = 0;
                        console.log("Change is Good | Actor source have the following classes with levels;");
                        for (const className in actorSource.data.data.classes) {
                            classLevels = classLevels + actorSource.data.data.classes[className].levels;
                            console.log("Change is Good | " + className + ", " + actorSource.data.data.classes[className].levels);
                        }
                        console.log("Change is Good | Total class level and CR to be updated to " + classLevels + ".");
                        await target.update({"data.details.cr": classLevels});
                    }
            }
            });
    
            },   
        CiGSyncAll: () => {
            const syncJobs = game.settings.get('fvtt-change-is-good','sync-jobs');
            for (const element of syncJobs) {
            api.CiGSyncProfActor2NPC(element.actorID, element.npcID);
            };
        },

        CiGDelSync: async (actorID, npcID) => {
            const syncJobs = game.settings.get('fvtt-change-is-good','sync-jobs');
            let foundIndex = syncJobs.findIndex((entry) => entry.actorID === actorID && entry.npcID === npcID);
            syncJobs.splice(foundIndex,1);
            game.settings.set('fvtt-change-is-good','sync-jobs', syncJobs);
        },

        CiGDelSyncAll: () => {
            game.settings.set('fvtt-change-is-good','sync-jobs', []);
        },
        };
    
        Object.freeze(api);
    
        game.modules.get('fvtt-change-is-good').api = api;
        
        console.log("Change is Good | Loaded and goated.")
        api.CiGSyncAll();
        console.log("Change is Good | Running all syncs.");
    });