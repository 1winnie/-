export function myPiniaPlugin(context){
    context.store.$subscribe(()=>{
        // console.log(context.store.CarMeals)
        localStorage.setItem('cartMeals',JSON.stringify(context.store.CarMeals))
    })
}