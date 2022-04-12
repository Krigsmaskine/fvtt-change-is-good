## What?
Change is Good is a module for Foundry Virtual Tabletop, only made possible through the TyphonJS Runtime Library (TRL) and the unending patience of the inhabitants of the Foundry Discord server. A module for the DnD5e system that tracks changes to documents (actor, token) and reacts to it. 

## Features, specifically, please.
*CiGSyncProfActor2NPC* - as the name might suggest, allows you to synchronize an actor's proficiency bonus to an NPC's. Requested out of the wazoo for Spiritual Weapons, badgers and warlocks' familiars alike. Note: DnD5e calculates proficiency bonus, so this works by changing the CR of the NPC to the actor's level, which should give the same proficiency bonus. 

### How?
*Synchronizing an actor's proficiency to an NPC's proficiency* - Create a new macro, switch it to script type, and fill the contents with
`game.modules.get("fvtt-change-is-good").api.CiGSyncProfActor2NPC(actorID, npcID);`
Fill actorID with the ID of your source actor, and npcID with the ID of your npc to be updated. The npc is now subscribed to the actor's proficiency and the next time the actor receives an update (can always change health back and forth to force it, until Krig codes it better™), the npc will change CR to match the proficiency bonus of the actor.

## That's it? What else?
Of course, I have grand plans, but honestly, my skills aren't there yet. I'm working on them, but I'm a developer led by selfish ambition. Feel free to lodge an issue with a request and I can see how feasible they are to add. I'll add a list of things I'm working on personally... when I get around to it.

### To-do
- A GUI. Just any, really.
- New function/feature to update an item (in code terms, e.g. weapon/feature/spell) when an attribute is changed; use-case: warlocks, again, and their pesky spell DC being able to be used by their familiars, instead of their own.