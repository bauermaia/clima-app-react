export function FactCard ({fact}) {
        if(!fact) return null;

        return (
            <>
            <div className='fact-card'>
            <h1>{fact}</h1>
            </div>
            </>
        )
    }