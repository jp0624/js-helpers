interface Module {title:string;folder:string;component?:string;keywords?:string[]}
interface Category {title:string;folder:string;component?:string;modules:Module[]}
interface Section {title:string;folder:string;categories:Category[]}
async function read<T>(url:string):Promise<T>{const response=await fetch(url);if(!response.ok)throw new Error(`Unable to load catalogue (${response.status})`);return response.json()}
export default async function GetSiteData(base=window.location.origin):Promise<Section[]>{const sections=await read<Section[]>(`${base}/data/sections/default.json`);return Promise.all(sections.map(async section=>{const categories=await read<Category[]>(`${base}/data/sections/${section.folder}/default.json`);return {...section,categories:await Promise.all(categories.map(async category=>({...category,modules:await read<Module[]>(`${base}/data/sections/${section.folder}/${category.folder}/default.json`)})))}}))}
