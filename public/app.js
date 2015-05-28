/** @jsx React.DOM */

var Games = React.createClass({displayName: 'Games',
  render: function() {
    return (
      React.createElement('div', {className: "games"},
         <ul className="list-unstyled">
            {this.items.map(function(value, i) {
        
                 return <li> <button className={value.classString} onClick={this.handleClick.bind(this, i)}>{value.name} </button></li>
            }, this)}
          </ul>
      )
    );
  },
  handleClick: function(i){
  	  console.log('You clicked: ' + this.items[i].name);
   },
  isFavored: function(short){
 		
        if(userGames.indexOf(short) != -1){
 	   console.log(userGames, short);

        	return true;
        }else{
        	return false;
        }

  },
  items: [],

  userGames: [],

  componentWillMount: function() {
	  this.firebaseUsers = new Firebase("https://amber-torch-6200.firebaseio.com/users");

	  this.firebaseUsers.on("value", function(snapshot) {
  		var user = snapshot.val()[0];

  		 this.userGames = user["favored-games"] || [];
 		console.log('setting', this.userGames);

	  });

	  this.firebaseGames = new Firebase("https://amber-torch-6200.firebaseio.com/games");

	  this.firebaseGames.on("child_added", function(dataSnapshot) {

	  	var item = dataSnapshot.val();

 				if(this.isFavored(item.short)){
 					item.classString =  "btn btn-default checked";
            	}else{
            		item.classString = "btn btn-default";

            	} 

 
	    this.items.push(item);
	    this.setState({
	      items: this.items
	    });
	  }.bind(this))
	}

});
React.render(
  React.createElement(Games, null),
  document.getElementById('content')
);