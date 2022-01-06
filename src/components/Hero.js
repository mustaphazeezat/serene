/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
    return (
        <section className='main-wrapper-x main-wrapper-y'>
            <div className='hero-wrapper'>
                <div className='hero-content'>
                    <h2>It's not just food, It's an experience.</h2>
                    <p>Experience tasty and fresh food every time.</p>
                    <div className='d-flx-alc action-wrapper'>
                        <Link to='/menu' className='main-btn'>menu</Link>
                        <Link to='/reservations' className='main-btn white-bg'>make reservation</Link>
                    </div>
                </div>
                <div className='image-container'>
                    <div className='leaf'>
                        <img src="https://www.freepnglogos.com/uploads/nature-png/leaf-leaves-nature-pic-11.png" 
                        width="200" alt="leaf, leaves, nature pic" title="Image from freepnglogos.com" />
                    </div>
                    <div className='img-wrapper'>
                        <img title="Image from freepnglogos.com" 
                            src="/images/image.png" 
                            width="200" alt="food, grass fed beef foodservice products grass run farms"
                        />
                    {/* https://www.freepnglogos.com/uploads/food-png/food-grass-fed-beef-foodservice-products-grass-run-farms-4.png */}
                    </div>
                    <div className='tomatoes'>
                        <img src="https://www.freepnglogos.com/uploads/tomato-png/tomato-viva-mamma-pasta-italian-style-authentic-meal-usa-22.png" width="200" title="Image from freepnglogos.com" alt="tomato, viva mamma pasta italian style authentic meal usa" />
                    </div>
                    <div className='olive'>
                        <img 
                            src="https://www.freepnglogos.com/uploads/olives-png/olives-olive-png-image-pngpix-9.png" 
                            width="200"  title="Image from freepnglogos.com" alt="olives, olive png image pngpix" />
                    </div>
                </div>
                
            </div>
        </section>
    )
}

export default Hero
