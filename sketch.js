//Create variables here
var dog;
var database;
var foodS;
var foodStock;
var dog_img;
var happyDog_img;
var addFood;
var feed;
var fedTime;
var lastFed;
var foodObj;
function preload()
{
  //load images here
  dog_img = loadImage("images/dogImg.png");
  happyDog_img = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(800, 700);
  dog = createSprite(650,600);
  dog.addImage(dog_img);
  dog.scale = 0.2;
  database = firebase.database();
  foodStock = database.ref("food");
  foodStock.on("value",readStock)

  foodObj = new Food();
  feed = createButton("Feed The Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }
     database.ref('/').update({
       food:x
     }) 

}
function draw() {  
  background(46,139,87);
  textSize(35);
  fill("white");
  foodObj.display();
  drawSprites();


  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Fed : " + lastFed%12 + "PM",350,30);
  }

  else if(lastFed ==0){
    text("Last Fed : 12AM",3350,30);
  }
  else{
    text("Last Fed" + lastFed + "AM",350,30);
  }
}

function feedDog(){
  dog.addImage(happyDog_img);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref("/").update({
    food:foodObj.getFoodStock(),
    fedTime:hour()
  });
}

function addFoods(){
  foodS++
  database.ref("/").update({
      food:foodS
  });
}



