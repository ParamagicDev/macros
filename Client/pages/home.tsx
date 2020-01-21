import React, { useState, useEffect } from 'react'
import axios, { AxiosResponse } from 'axios'
import Layout from '../components/Layout'
import FoodCard from '../components/foodCard/FoodCard'

const Home: React.FC = () => {
  const [currentPosts, getPosts] = useState([])
  const url = 'http://localhost:5000'
  const fetchPosts = async () => {
    const response: AxiosResponse = await axios.get(`${url}/foodposts`)
    const postsList = await response.data
    getPosts(postsList)
  }

  useEffect(() => {
    try {
      fetchPosts()
    } catch (error) {
      console.log(error)
    }
  }, [])
  return (
    <Layout title="NewsFeed | Macros">
      <div id="cardList">
        {currentPosts.map((post, i) => {
          return (
            <FoodCard
              key={i}
              id={post._id}
              userName={post.user.userName}
              title={post.title}
              tags={post.tags}
              macros={post.macros}
              saves={post.saves}
              foodPhoto={post.foodPhoto}
            />
          )
        })}
      </div>
      <style jsx>{``}</style>
    </Layout>
  )
}

export default Home