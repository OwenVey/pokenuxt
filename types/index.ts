export type ColorVariant = 'default' | 'light' | 'dark' | 'text-light';

export interface Pokemon {
  abilities: PokemonAbility[];
  base_experience: number;
  forms: NamedAPIResource[];
  game_indices: VersionGameIndex[];
  height: number;
  held_items: PokemonHeldItem[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: PokemonMove[];
  name: string;
  order: number;
  past_types: PokemonTypePast[];
  species: NamedAPIResource;
  sprites: PokemonSprites;
  stats: PokemonStat[];
  types: PokemonType[];
  weight: number;
}

export interface PokemonAbility {
  ability: NamedAPIResource;
  is_hidden: boolean;
  slot: number;
}

export interface VersionGameIndex {
  game_index: number;
  version: NamedAPIResource;
}

export interface PokemonHeldItem {
  item: NamedAPIResource;
  version_details: PokemonHeldItemVersion[];
}

export interface PokemonHeldItemVersion {
  rarity: number;
  version: NamedAPIResource;
}

export interface PokemonMove {
  move: NamedAPIResource;
  version_group_details: PokemonMoveVersion[];
}

export const versionGroups = [
  'red-blue',
  'yellow',
  'gold-silver',
  'crystal',
  'ruby-sapphire',
  'emerald',
  'firered-leafgreen',
  'diamond-pearl',
  'platinum',
  'heartgold-soulsilver',
  'black-white',
  'colosseum',
  'xd',
  'black-2-white-2',
  'x-y',
  'omega-ruby-alpha-sapphire',
  'sun-moon',
  'ultra-sun-ultra-moon',
  'lets-go-pikachu-lets-go-eevee',
  'sword-shield',
] as const;

export type VersionGroup = (typeof versionGroups)[number];

export interface PokemonMoveVersion {
  move_learn_method: NamedAPIResource;
  version_group: NamedAPIResource;
  level_learned_at: number;
}

export interface PokemonTypePast {
  generation: NamedAPIResource;
  types: PokemonType[];
}

export interface PokemonType {
  slot: number;
  type: NamedAPIResource;
}

export interface PokemonSprites {
  back_default: string;
  back_female: string;
  back_shiny: string;
  back_shiny_female: string;
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
  other: Other;
  versions: Versions;
}

export interface Other {
  dream_world: DreamWorld;
  home: Home;
  'official-artwork': OfficialArtwork;
}

export interface DreamWorld {
  front_default: string;
  front_female: string;
}

export interface Home {
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
}

export interface OfficialArtwork {
  front_default: string;
  front_shiny: string;
}

export interface Versions {
  'generation-i': GenerationI;
  'generation-ii': GenerationIi;
  'generation-iii': GenerationIii;
  'generation-iv': GenerationIv;
  'generation-v': GenerationV;
  'generation-vi': GenerationVi;
  'generation-vii': GenerationVii;
  'generation-viii': GenerationViii;
}

export interface GenerationI {
  'red-blue': RedBlue;
  yellow: Yellow;
}

export interface RedBlue {
  back_default: string;
  back_gray: string;
  back_transparent: string;
  front_default: string;
  front_gray: string;
  front_transparent: string;
}

export interface Yellow {
  back_default: string;
  back_gray: string;
  back_transparent: string;
  front_default: string;
  front_gray: string;
  front_transparent: string;
}

export interface GenerationIi {
  crystal: Crystal;
  gold: Gold;
  silver: Silver;
}

export interface Crystal {
  back_default: string;
  back_shiny: string;
  back_shiny_transparent: string;
  back_transparent: string;
  front_default: string;
  front_shiny: string;
  front_shiny_transparent: string;
  front_transparent: string;
}

export interface Gold {
  back_default: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string;
  front_transparent: string;
}

export interface Silver {
  back_default: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string;
  front_transparent: string;
}

export interface GenerationIii {
  emerald: Emerald;
  'firered-leafgreen': FireredLeafgreen;
  'ruby-sapphire': RubySapphire;
}

export interface Emerald {
  front_default: string;
  front_shiny: string;
}

export interface FireredLeafgreen {
  back_default: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string;
}

export interface RubySapphire {
  back_default: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string;
}

export interface GenerationIv {
  'diamond-pearl': DiamondPearl;
  'heartgold-soulsilver': HeartgoldSoulsilver;
  platinum: Platinum;
}

export interface DiamondPearl {
  back_default: string;
  back_female: string;
  back_shiny: string;
  back_shiny_female: string;
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
}

export interface HeartgoldSoulsilver {
  back_default: string;
  back_female: string;
  back_shiny: string;
  back_shiny_female: string;
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
}

export interface Platinum {
  back_default: string;
  back_female: string;
  back_shiny: string;
  back_shiny_female: string;
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
}

export interface GenerationV {
  'black-white': BlackWhite;
}

export interface BlackWhite {
  animated: Animated;
  back_default: string;
  back_female: string;
  back_shiny: string;
  back_shiny_female: string;
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
}

export interface Animated {
  back_default: string;
  back_female: string;
  back_shiny: string;
  back_shiny_female: string;
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
}

export interface GenerationVi {
  'omegaruby-alphasapphire': OmegarubyAlphasapphire;
  'x-y': XY;
}

export interface OmegarubyAlphasapphire {
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
}

export interface XY {
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
}

export interface GenerationVii {
  icons: Icons;
  'ultra-sun-ultra-moon': UltraSunUltraMoon;
}

export interface Icons {
  front_default: string;
  front_female: string;
}

export interface UltraSunUltraMoon {
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
}

export interface GenerationViii {
  icons: Icons2;
}

export interface Icons2 {
  front_default: string;
  front_female: string;
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: NamedAPIResource;
}

export const types = [
  'normal',
  'fighting',
  'flying',
  'poison',
  'ground',
  'rock',
  'bug',
  'ghost',
  'steel',
  'fire',
  'water',
  'grass',
  'electric',
  'psychic',
  'ice',
  'dragon',
  'dark',
  'fairy',
] as const;

export type Type = (typeof types)[number];

export interface NamedAPIResourceList {
  count: number;
  next: string;
  previous: string;
  results: NamedAPIResource[];
}

export interface NamedAPIResource {
  name: string;
  url: string;
}

export interface APIResource {
  url: string;
}

export interface PokemonSpecies {
  base_happiness: number;
  capture_rate: number;
  color: NamedAPIResource;
  egg_groups: NamedAPIResource[];
  evolution_chain: APIResource;
  evolves_from_species: NamedAPIResource;
  flavor_text_entries: FlavorText[];
  form_descriptions: Description[];
  forms_switchable: boolean;
  gender_rate: number;
  genera: Genus[];
  generation: NamedAPIResource;
  growth_rate: NamedAPIResource;
  habitat: NamedAPIResource;
  has_gender_differences: boolean;
  hatch_counter: number;
  id: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  name: string;
  names: Name[];
  order: number;
  pal_park_encounters: PalParkEncounterArea[];
  pokedex_numbers: PokemonSpeciesDexEntry[];
  shape: NamedAPIResource;
  varieties: PokemonSpeciesVariety[];
}

export interface FlavorText {
  flavor_text: string;
  language: NamedAPIResource;
  version: NamedAPIResource;
}

export interface Description {
  description: string;
  language: NamedAPIResource;
}

export interface Genus {
  genus: string;
  language: NamedAPIResource;
}

export interface Name {
  language: NamedAPIResource;
  name: string;
}

export interface PalParkEncounterArea {
  area: NamedAPIResource;
  base_score: number;
  rate: number;
}

export interface PokemonSpeciesDexEntry {
  entry_number: number;
  pokedex: NamedAPIResource;
}

export interface PokemonSpeciesVariety {
  is_default: boolean;
  pokemon: NamedAPIResource;
}

export interface EvolutionChain {
  id: number;
  baby_trigger_item: NamedAPIResource;
  chain: ChainLink;
}

export interface ChainLink {
  is_baby: boolean;
  species: NamedAPIResource;
  evolution_details: EvolutionDetail[];
  evolves_to: ChainLink[];
}

export interface EvolutionChainWithSpecies extends Omit<EvolutionChain, 'chain'> {
  chain: ChainLinkWithSpecies;
}

export interface ChainLinkWithSpecies extends Omit<ChainLink, 'species' | 'evolves_to'> {
  species: PokemonSpecies;
  evolves_to: ChainLinkWithSpecies[];
}

export interface EvolutionDetail {
  item: NamedAPIResource;
  trigger: NamedAPIResource;
  gender: number;
  held_item: NamedAPIResource;
  known_move: NamedAPIResource;
  known_move_type: NamedAPIResource;
  location: NamedAPIResource;
  min_level: number;
  min_happiness: number;
  min_beauty: number;
  min_affection: number;
  needs_overworld_rain: boolean;
  party_species: NamedAPIResource;
  party_type: NamedAPIResource;
  relative_physical_stats: number;
  time_of_day: string;
  trade_species: NamedAPIResource;
  turn_upside_down: boolean;
}

export interface Move {
  id: number;
  name: string;
  accuracy: number;
  effect_chance: number;
  pp: number;
  priority: number;
  power: number;
  contest_combos: ContestComboSets;
  contest_type: NamedAPIResource;
  contest_effect: APIResource;
  damage_class: NamedAPIResource;
  effect_entries: VerboseEffect[];
  effect_changes: AbilityEffectChange[];
  learned_by_pokemon: NamedAPIResource[];
  flavor_text_entries: MoveFlavorText[];
  generation: NamedAPIResource;
  machines: MachineVersionDetail[];
  meta: MoveMetaData;
  names: Name[];
  past_values: PastMoveStatValues[];
  stat_changes: MoveStatChange[];
  super_contest_effect: APIResource;
  target: NamedAPIResource;
  type: NamedAPIResource;
}

export interface ContestComboSets {
  normal: ContestComboDetail;
  super: ContestComboDetail;
}

export interface ContestComboDetail {
  use_before: NamedAPIResource;
  use_after: NamedAPIResource;
}

export interface VerboseEffect {
  effect: string;
  short_effect: string;
  language: NamedAPIResource;
}

export interface AbilityEffectChange {
  effect_entries: Effect[];
  version_group: NamedAPIResource;
}

export interface Effect {
  effect: string;
  language: NamedAPIResource;
}

export interface MoveFlavorText {
  flavor_text: string;
  language: NamedAPIResource;
  version_group: NamedAPIResource;
}

export interface MachineVersionDetail {
  machine: APIResource;
  version_group: NamedAPIResource;
}

export interface MoveMetaData {
  ailment: NamedAPIResource;
  category: NamedAPIResource;
  min_hits: number;
  max_hits: number;
  min_turns: number;
  max_turns: number;
  drain: number;
  healing: number;
  crit_rate: number;
  ailment_chance: number;
  flinch_chance: number;
  stat_chance: number;
}

export interface PastMoveStatValues {
  accuracy: number;
  effect_chance: number;
  power: number;
  pp: number;
  effect_entries: VerboseEffect[];
  type: NamedAPIResource;
  version_group: NamedAPIResource;
}

export interface MoveStatChange {
  change: number;
  stat: NamedAPIResource;
}
