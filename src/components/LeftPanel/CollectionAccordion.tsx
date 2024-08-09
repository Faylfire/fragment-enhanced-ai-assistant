import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Entry } from '@/types/types';

const characterList: Entry[] = [{
    collectionType: 'character',
    title: 'John Doe',
    tags: ['protagonist', 'hero'],
    aliases: ['JD', 'The Unknown Man'],
    description: 'A mysterious character with a hidden past.',
    notes: 'Consider revealing his background in chapter 5.',
    additions: [
      { sceneOrder: 1, content: 'John appears for the first time.' },
      { sceneOrder: 3, content: 'John reveals a crucial piece of information.' }
    ]
  },
  {
    collectionType: 'character',
    title: 'Olivia Martini',
    tags: ['love-interest', 'friend'],
    aliases: ['OM', 'The UnMan'],
    description: 'A mysterious character with a hidden past.',
    notes: 'Consider killing her over and over again',
    additions: [
      { sceneOrder: 1, content: 'Olivia dies' },
      { sceneOrder: 3, content: 'JOlivia dies again' }
    ]
  },
  {
    collectionType: 'character',
    title: 'Jackson Lee',
    tags: ['side-character', 'friend'],
    aliases: ['JL', 'The Known Man'],
    description: 'Friend of the main character who knows',
    notes: 'Consider revealing his background in chapter 6.',
    additions: [
      { sceneOrder: 2, content: 'Appears for the first time to John' },
      { sceneOrder: 3, content: 'John reveals a crucial piece of information to Jackson' }
    ]
  },
  {
    collectionType: 'character',
    title: 'Lee Jack',
    tags: ['side-character', 'friend'],
    aliases: ['LJ', 'The Man Knowing'],
    description: 'The alter ego of Jackson Lee who knows he is the alter ego',
    notes: 'He is the real jackson and jackson is the alter ego',
    additions: [
      { sceneOrder: 3, content: 'Appears for the first time to John' },
      { sceneOrder: 4, content: 'Lee is the one that kills Olivia' }
    ]
  },
]

const locationList: Entry[] = [{
    collectionType: 'location',
    title: 'Whispering Woods',
    tags: ['forest', 'mysterious', 'central'],
    aliases: ['WW','The Enchanted Forest', 'Murmur Grove'],
    description: 'A dense, misty forest known for its eerie whispers and shifting paths.',
    notes: 'Key location for several plot twists and character revelations.',
    additions: [
      { sceneOrder: 1, content: 'First appearance of the Whispering Woods in the story.' },
      { sceneOrder: 3, content: 'A hidden clearing in the woods reveals an ancient secret.' }
    ]
  },
  {
    collectionType: 'location',
    title: 'Crimson Cliffs',
    tags: ['coastal', 'dangerous', 'scenic'],
    aliases: ['CC','The Red Bluffs', 'Bloodstone Precipice'],
    description: 'Towering cliffs of red rock overlooking a turbulent sea.',
    notes: 'Consider setting a dramatic confrontation scene here',
    additions: [
      { sceneOrder: 1, content: 'Characters first view the Crimson Cliffs from a distance' },
      { sceneOrder: 3, content: 'A perilous climb up the cliffs leads to a discovery' }
    ]
  },
  {
    collectionType: 'location',
    title: 'Neon Nexus',
    tags: ['urban', 'futuristic', 'central'],
    aliases: ['NN','The Glowing City', 'Luminous Metropolis'],
    description: 'A bustling cyberpunk city filled with towering skyscrapers and neon lights.',
    notes: 'Hub for technology and information gathering scenes.',
    additions: [
      { sceneOrder: 2, content: 'Characters arrive in Neon Nexus for the first time' },
      { sceneOrder: 3, content: 'A secret meeting takes place in a hidden neon-lit alley' }
    ]
  },
  {
    collectionType: 'location',
    title: 'Echoing Caverns',
    tags: ['underground', 'mysterious', 'ancient'],
    aliases: ['EC','The Resonant Depths', 'Whispering Caves'],
    description: 'A vast network of underground caves known for their strange acoustic properties.',
    notes: 'Potential for hidden civilizations or ancient artifacts',
    additions: [
      { sceneOrder: 3, content: 'Characters discover the entrance to the Echoing Caverns' },
      { sceneOrder: 4, content: 'An ancient message is deciphered from the cave echoes' }
    ]
  },
    {
    collectionType: 'location',
    title: 'Floating Isles of Aether',
    tags: ['aerial', 'magical', 'archipelago'],
    aliases: ['FI','Sky Islands', 'Celestial Archipelago'],
    description: 'A chain of floating islands suspended in the sky, each with its own unique ecosystem.',
    notes: 'Perfect setting for aerial battles or a quest to unite the fragmented sky kingdoms.',
    additions: [
      { sceneOrder: 5, content: 'Characters first arrive on the lowest of the Floating Isles.' },
      { sceneOrder: 7, content: 'A dramatic chase sequence across multiple floating islands.' }
    ]
  },
  {
    collectionType: 'location',
    title: 'Chrono Citadel',
    tags: ['temporal', 'ancient', 'enigmatic'],
    aliases: ['Ch','The Timeless Fortress', "Eternity's Bastion"],
    description: 'A massive structure where time flows differently in each room and corridor.',
    notes: 'Use for time-bending puzzles and encounters with characters from different eras.',
    additions: [
      { sceneOrder: 6, content: 'The party enters the Chrono Citadel, experiencing time dilation.' },
      { sceneOrder: 8, content: 'A crucial item is found in a room where time flows backwards.' }
    ]
  },
  {
    collectionType: 'location',
    title: 'Mirage Oasis',
    tags: ['desert', 'illusion', 'sanctuary'],
    aliases: ["MO",'The Shimmering Haven', 'Fata Morgana'],
    description: 'A lush oasis in the heart of a scorching desert, known for its reality-bending properties.',
    notes: 'Ideal for scenes involving deception, self-discovery, or hidden truths.',
    additions: [
      { sceneOrder: 4, content: 'Characters stumble upon the Mirage Oasis after days in the desert.' },
      { sceneOrder: 9, content: 'The true nature of the oasis is revealed, changing everything.' }
    ]
  }
]


export default function CollectionAccordion(){

    return(
      <>
        <Accordion type="multiple" defaultValue={["character", "location", "custom"]} className="w-full">
            <AccordionItem value="character">
                <div className='flex'>
                <div className='flex flex-grow items-center justify-between px-4'>
                    <div className='font-bold'>{`Character (${characterList.length})`}</div>
                    <Button onClick={()=>console.log('clicked add entry')} aria-label="Add new item" className='bg-background hover:bg-background hover:text-muted-foreground text-foreground font-bold text-2xl p-0'>+</Button>
                </div>
                <AccordionTrigger className='flex-none'></AccordionTrigger>
                </div>
                <AccordionContent>
                    {characterList.map((character:Entry, index:number)=>{
                        return (
                        <div key={`${character.collectionType}-${index}`}className="flex items-center gap-4 hover:bg-highlight p-2 rounded-lg">
                            <Avatar className="hidden h-9 w-9 sm:flex">
                            <AvatarImage src="/avatars/01.png" alt="Avatar" />
                            <AvatarFallback>{character.aliases[0]}</AvatarFallback>
                            </Avatar>
                            <div className="grid gap-1">
                            <p className="text-sm font-medium leading-none">
                                {character.title}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                {character.description}
                            </p>
                            </div>
                            <div className="ml-auto font-sm">{character.tags[0]||character.collectionType}</div>
                        </div>
                        )
                    })} 
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="location">
                <div className='flex'>
                <div className='flex flex-grow items-center justify-between px-4'>
                    <div className='font-bold'>{`Location (${locationList.length})`}</div>
                    <Button onClick={()=>console.log('clicked add entry')} aria-label="Add new item" className='bg-background hover:bg-background hover:text-muted-foreground text-foreground font-bold text-2xl p-0'>+</Button>
                </div>
                <AccordionTrigger className='flex-none'></AccordionTrigger>
                </div>
                <AccordionContent>
                    {locationList.map((character:Entry, index:number)=>{
                        return (
                        <div key={`${character.collectionType}-${index}`} className="flex items-center gap-4 hover:bg-highlight p-2 rounded-lg">
                            <Avatar className="hidden h-9 w-9 sm:flex">
                            <AvatarImage src="/avatars/01.png" alt="Avatar" />
                            <AvatarFallback>{character.aliases[0]}</AvatarFallback>
                            </Avatar>
                            <div className="grid gap-1">
                            <p className="text-sm font-medium leading-none">
                                {character.title}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                {character.description}
                            </p>
                            </div>
                            <div className="ml-auto font-sm">{character.tags[0]||character.collectionType}</div>
                        </div>
                        )
                    })} 
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="custom">
                <div className='flex'>
                <div className='flex flex-grow items-center justify-between px-4'>
                    <div className='font-bold'>{`Custom (1)`}</div>
                    <Button onClick={()=>console.log('clicked add entry')} aria-label="Add new item" className='bg-background hover:bg-background hover:text-muted-foreground text-foreground font-bold text-2xl p-0'>+</Button>
                </div>
                <AccordionTrigger className='flex-none'></AccordionTrigger>
                </div>
                <AccordionContent>
                This is where custom items will be shown, each custom item will have their own accordion content such as tropes, general, guidelines, story structure, etc.
                </AccordionContent>
            </AccordionItem>
        </Accordion>
      </>
    )
}