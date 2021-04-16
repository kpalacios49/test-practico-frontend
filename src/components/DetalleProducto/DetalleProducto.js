import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import './DetalleProducto.scss'

import { searchItem } from '../../store/busqueda/actions'
import { seo, numberWithCommas } from '../../helpers'


const DetalleProducto = () => {

    let { id } = useParams()

    const producto = useSelector(state => state.busqueda.items.find(item => item.id === id))

    const item_loading = useSelector(state => state.ui.item_loading)

    const dispatch = useDispatch()

    useEffect(() => {
        if (!producto?.description) {
            dispatch(searchItem(id))
        }
        return () => seo()
    }, [])

    useEffect(() => {
        seo({
            title: producto?.title,
            metaDescription: `Compralo en Mercado Libre a $${numberWithCommas(producto?.price?.amount)} - ${producto?.free_shipping ? 'Envío gratis a todo el país' : ''}. Encontrá más productos de ${producto?.categories?.join(", ")}.`
        });
    }, [producto])

    return (
        <section className='detalle-producto'>
            <p className="breadcrumb"> {producto?.categories?.join(" > ")} </p>
            {
                <div className="contenido">
                    <p className="no-items">Parece que el producto que buscás no existe más</p>
                </div>
            }
            <article className="contenido wrapper">

                <figure className="one">

                    {
                        producto ? (
                            <img src={producto.picture} alt="Producto" />
                        ) : ''
                    }

                </figure>
                <div className="two  contenido-derecha">
                    <p>
                        {
                            !item_loading && producto?.condition ? (
                                <span>{producto?.condition} - {producto?.sold_quantity} vendidos</span>
                            ) : ''
                        }
                    </p>
                    <h1 className={item_loading && !producto?.title ? 'loading' : ''}>
                        {producto?.title}
                    </h1>
                    <p className={`precio ${item_loading && !producto?.price ? 'loading' : ''}`}>
                        {producto?.price?.currency === 'ARS' ? '$ ' : ''}
                        <span>
                            {numberWithCommas(producto?.price?.amount)}
                        </span>
                        <span className="decimales">
                            {producto?.price?.decimals < 10 ? `0${producto?.price?.decimals}` : producto?.price?.decimals}
                        </span>
                    </p>
                    <button className="btn-comprar">Comprar</button>

                </div>
                <div className="three descripcion">
                    <h2>Descripción del producto</h2>
                    <p className={item_loading && !producto?.description ? 'loading' : ''}>
                        {producto?.description}
                    </p>
                </div>

            </article>



        </section>
    )

}

export default DetalleProducto