export default function NavBar() {
  return (
    <>
      <section className="container">
        <div className="box">
          <div className="bone">
            <h1>STREAM<span>X</span></h1>
          </div>
          <div className="btwo">
            <a href="">Home</a>
            <a href="">Movies</a>
            <a href="">Series</a>
            <a href="">Trending</a>
            <a href="">Categories</a>
          </div>
        </div>

        <div className="bthree">
        <div id="input">
          <input id="amount-input" placeholder="Search Movies, Series..."
          />
          <img src="\src\assets\Group (1).png" alt="" />
        
        </div>

        <img src="\src\assets\Ellipse 14.png" alt="" />
        </div>
      </section>
    </>
  );
}
