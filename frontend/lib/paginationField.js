import {PAGINATION_QUERY} from "../components/Pagination"

export default function paginationField () {
    return {
        keyArgs:false, //tell apollo we will take care of everything
        read(existing=[],{args,cache}){
            const {skip,first} = args
            //Read the number of items in page from the cache
            const data = cache.readQuery({query:PAGINATION_QUERY})
            const count = data?._allProductsMeta?.count
            const page = skip/first + 1;
            const pages = Math.ceil(count/first)
            console.log(data)
            const items = existing.slice(skip,skip+first).filter((x) => x);
            if(items.length && items.length !== first && page === pages) {
                return items;
            }
            if(items.length !== first) {
                return false
            }
            //If items are present fetch from cache
            if(items.length){
                console.log(`there are the ${items.length}`)
                return items
            }
            return false
        },  

         merge(existing,incoming,{args}){
             const {skip,first} = args
                console.log(`merging items from the network ${incoming.length}`)
                console.log(incoming)
                const merged = existing ? existing.slice(0) : [];
                for(let i = skip; i <skip+ incoming.length; ++i) {
                    merged[i] = incoming[i - skip]
                }
                return merged;
                //finally we returbed the merged item from the cache
            },
    };
}