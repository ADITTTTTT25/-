class Food {

    constructor(x,y,width,height){
        var foodStock,lastFed;
        this.image = loadImage("Milk(1).png");
        this.w = width;
        this.h = height;
       
    }

    display(){
        
       var x = 80, y = 100;

       imageMode(CENTER);
       image(this.image,720,220,70,70);

       if(this.foodStock!=0){
            for(var i = 0; i < this.foodStock; i++){
                if(i%10 === 0){
                    x=80;
                    y = y+50;
                }
                image(this.image,x,y,50,50);
                x=x+30;
            }
       }
    }

    getFoodStock(){
        var foodRef = database.ref("food");
        foodRef.on("value",function(data){
            foodS = data.val();
        })
    }

    updateFoodStock(food){
        database.ref("/").update({
            foodS:food
        });
    }
    
    deductFood(){
        if(Feed.mousePressed === true){
            foodS = foodS - 1;
          }
    }


}