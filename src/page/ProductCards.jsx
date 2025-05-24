mport React from 'react'
import { ShoppingCart, ArrowLeft, ArrowRight } from 'lucide-react';

function ProductsCard() {
    return (
        <div>
                    <div>
                        <div className='flex flex-row justify-between'>
                            <div>
                            <div className='w-[263px] h-[263px] bg-[#F7F7F7] flex items-center justify-center'>
                            <img src="./public/OIP-removebg-preview.png" className="w-[200px] h-[200px]" alt=""/>
                            </div>
                            <h4 className='text-[18px] text-[#9C9C9C]'>Молоко</h4>
                            <p className='text-[18px]'>Очень вкусное молоко</p>
                            <h3 className='text-[24px]'>2 441 ₽</h3>
                            <div className='flex flex-row justify-self-start text-white gap-2 py-2 px-20 bg-blue-500'>
                                <ShoppingCart/>
                            <button className=''>В корзину</button>
                            </div>
                        </div>

                        <div>
                            <div className='w-[263px] h-[263px] bg-[#F7F7F7] flex items-center justify-center'>
                            <img src="./public/R.jpg" className="w-[263px] h-[263px]" alt=""/>
                            </div>
                            <h4 className='text-[18px] text-[#9C9C9C]'>Мясная</h4>
                            <p className='text-[18px]'>Сочное Мясо</p>
                            <h3 className='text-[24px]'>2 362 ₽</h3>
                            <div className='flex flex-row justify-self-start text-white gap-2 py-2 px-20 bg-blue-500'>
                                <ShoppingCart/>
                            <button className=''>В корзину</button>
                            </div>
                        </div>

                        <div>
                            <div className='w-[263px] h-[263px] bg-[#F7F7F7] flex items-center justify-center'>
                            <img className='h-[263px]' src="./public/depositphotos_135981582-stock-photo-fresh-fruits-and-vegetables-background.jpg" alt=""/>
                            </div>
                            <h4 className='text-[18px] text-[#9C9C9C]'>Офощи и Фрукты</h4>
                            <p className='text-[18px]'>Свещие Фрукты и Овощи</p>
                            <h3 className='text-[24px]'>1 185 ₽</h3>
                            <div className='flex flex-row justify-self-start text-white gap-2 py-2 px-20 bg-blue-500'>
                                <ShoppingCart/>
                            <button className=''>В корзину</button>
                            </div>
                        </div>

                        <div>
                            <div className='w-[263px] h-[263px] bg-[#F7F7F7] flex items-center justify-center'>
                            <img src="./public/R (1).jpg" alt=""/>
                            </div>
                            <h4 className='text-[18px] text-[#9C9C9C]'>Ягоды</h4>
                            <p className='text-[18px]'>Очень сочные ягоды</p>
                            <h3 className='text-[24px]'>8 200 ₽</h3>
                            <div className='flex flex-row justify-self-start text-white gap-2 py-2 px-20 bg-blue-500'>
                                <ShoppingCart/>
                            <button className=''>В корзину</button>
                            </div>
                        </div>
                    </div>
                    </div>
                                        <div className='flex justify-between py-10'>
                        <h2 className='text-[36px]'>Новинки</h2>
                        <div className='flex gap-4'>
                        <button><ArrowLeft className='bg-blue-500 w-[55px] h-[55px] rounded-md py-2 text-white'/></button>
                        <button><ArrowRight className='bg-blue-500 w-[55px] h-[55px] rounded-md py-2 text-white'/></button>
                        </div>
                    </div>
                    <ProductsCard/>
                    <div className='flex justify-around bg-blue-400 mt-10 h-[300px]'>
                        <img src="./public/25931-removebg-preview.png" className='w-[250px]' alt=""/>
                        <div className='flex flex-col justify-center text-white items-center'>
                            <h3 className='text-3xl'>Акционные товары</h3>
                            <span className='border w-[200px] my-4'></span>
                            <a className='text-blue-400 w-[260px] h-[45px] font-bold bg-white flex items-center justify-center' href="/">Перейти в каталог</a>
                        </div>
                        <img src="./R__1_-removebg-preview.png" className='w-[250px]' alt=""/>
                    </div>
                                        <div className='flex justify-between py-10'>
                        <h2 className='text-[36px]'>Товары месяца</h2>
                        <div className='flex gap-4'>
                        <button><ArrowLeft className='bg-blue-500 w-[55px] h-[55px] rounded-md py-2 text-white'/></button>
                        <button><ArrowRight className='bg-blue-500 w-[55px] h-[55px] rounded-md py-2 text-white'/></button>
                        </div>
                    </div>
                    <div>
                        <div className='flex flex-row justify-between'>
                            <div>
                            <div className='w-[263px] h-[263px] bg-[#F7F7F7] flex items-center justify-center'>
                            <img src="./public/OIP-removebg-preview.png" className="w-[200px] h-[200px]" alt=""/>
                            </div>
                            <h4 className='text-[18px] text-[#9C9C9C]'>Молоко</h4>
                            <p className='text-[18px]'>Очень вкусное молоко</p>
                            <h3 className='text-[24px]'>2 441 ₽</h3>
                            <div className='flex flex-row justify-self-start text-white gap-2 py-2 px-20 bg-blue-500'>
                                <ShoppingCart/>
                            <button className=''>В корзину</button>
                            </div>
                        </div>

                        <div>
                            <div className='w-[263px] h-[263px] bg-[#F7F7F7] flex items-center justify-center'>
                            <img src="./public/R.jpg" className="w-[263px] h-[263px]" alt=""/>
                            </div>
                            <h4 className='text-[18px] text-[#9C9C9C]'>Мясная</h4>
                            <p className='text-[18px]'>Сочное Мясо</p>
                            <h3 className='text-[24px]'>2 362 ₽</h3>
                            <div className='flex flex-row justify-self-start text-white gap-2 py-2 px-20 bg-blue-500'>
                                <ShoppingCart/>
                            <button className=''>В корзину</button>
                            </div>
                        </div>

                        <div>
                            <div className='w-[263px] h-[263px] bg-[#F7F7F7] flex items-center justify-center'>
                            <img className='h-[263px]' src="./public/depositphotos_135981582-stock-photo-fresh-fruits-and-vegetables-background.jpg" alt=""/>
                            </div>
                            <h4 className='text-[18px] text-[#9C9C9C]'>Офощи и Фрукты</h4>
                            <p className='text-[18px]'>Свещие Фрукты и Овощи</p>
                            <h3 className='text-[24px]'>1 185 ₽</h3>
                            <div className='flex flex-row justify-self-start text-white gap-2 py-2 px-20 bg-blue-500'>
                                <ShoppingCart/>
                            <button className=''>В корзину</button>
                            </div>
                        </div>

                        <div>
                            <div className='w-[263px] h-[263px] bg-[#F7F7F7] flex items-center justify-center'>
                            <img src="./public/R (1).jpg" alt=""/>
                            </div>
                            <h4 className='text-[18px] text-[#9C9C9C]'>Ягоды</h4>
                            <p className='text-[18px]'>Очень сочные ягоды</p>
                            <h3 className='text-[24px]'>8 200 ₽</h3>
                            <div className='flex flex-row justify-self-start text-white gap-2 py-2 px-20 bg-blue-500'>
                                <ShoppingCart/>
                            <button className=''>В корзину</button>
                            </div>
                            </div>
                        </div>
                    </div>
		</div>
    )
}
export default ProductsCard