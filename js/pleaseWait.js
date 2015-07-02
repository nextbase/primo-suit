var searchTerms = "";
var scope = "";
var queryStatusURL = "/primo_library/libweb/action/search.do?fn=stat";
var stopAndShowURL = "/primo_library/libweb/action/search.do?fn=shw";
var engaged = false;
var statusObj = null;
var continuedSearch = false;
var isNewTab = false;
var tabsRemote = false;
var enablePopup=true;

function getScope(tab){
	try{
		var select = document.getElementById("exlidSearchIn");
		if (!isNewTab){
			scope = $('.EXLSearchFieldRibbonFormSelectedCollection a').children('.EXLSearchFieldStrippedText').text();
			if (!scope){
				scope = select.options[select.selectedIndex].text;
			}
		}else{
			scope = document.getElementById("defaultScope"+tab).innerHTML;
		}
	}catch(err){
		scope = '';
	}
	return scope;
}
function getScopeCode(){
	try{
		var select = document.getElementById("lookIn");
		return select.options[select.selectedIndex].value;
	}catch(err){
		return '';
	}
}

function setSearchTerms(terms,tab,scopeName){
	if (terms!=null){
		searchTerms = terms;
	}
	if (scopeName){
		scope = scopeName;
	}else{
		scope = getScope(tab);
	}
	$('#exlidPleaseWaitSearchTerms').text(searchTerms);
	$('#exlidPleaseWaitSearchScope').text(scope);
}

//this method checks to make sure queryTerms exist, if not, 'pleaseWait' will not display.
//it also returns the queryTerms it finds, killing two birds with one stone.
function areThereQueryTerms(){
	try{

		var freeText0 = null;
		var freeText1 = null;

		var elems = document.getElementsByName("vl(freeText0)");
		if (elems.length>0){
			freeText0 = elems[0];
		}

		elems = document.getElementsByName("vl(freeText1)");

		if (elems.length>0){
			freeText1 = elems[0];
		}

		//here begins the stupid overly complicated logic just to make sure everything is clear.
		var queryname = freeText0.value;

		try{
			if (freeText1.value.length>0){
				queryname += ' / ';
				queryname += freeText1.value;
			}
		}catch(e){
		}

	}catch(err){
		return false;
	}

	if (queryname.length>0){
		return queryname;
	}

	return false;
}


//wrapper function for backwards compatibility
function delay(){
	doPleaseWait();
}

//get the search term from suggested new search related_tile.jsp(
function suggestedPleaseWait(terms){
	doPleaseWait(true,false,false,false,terms);
}

function doPleaseWait(newSearch,newTab,tabsRemote,tab,searchTerm,scopeName){
	isNewTab = newTab;
	//window.scrollTo(0,0);
	if (newSearch){
		continuedSearch = false;
	}else{
		continuedSearch = true;
	}
	if(searchTerm){
		var thereAreQueryTerms = searchTerm;
	}else{
		var thereAreQueryTerms = areThereQueryTerms();
	}
	if (!tabsRemote && newTab){
		enablePopup= false;
	}
	if ((thereAreQueryTerms && enablePopup )==true){ //don't display 'pleaseWait' if no query terms exist.
		setSearchTerms(thereAreQueryTerms,tab,scopeName); //in which case, let's update the searchTerms from the form.

		$('#exlidLightbox').show();
		$('#exlidPleaseWaitContainer').show();
		$('#exlidPleaseWaitContainer').attr("tabindex",-1).focus();
		$('#exlidProgressBar').css('width','0%').animate({width:'100%'},30000);

		$('#exlidPleaseWaitStopSearch').unbind('click').click(function(e){
			e.preventDefault();
			$.get(stopAndShowURL); //fire and forget
		});
	}
}

function handlePleaseWaitStatusResponse(){
	//we no longer care about in progress updates -- only stopped updates. (though we left the in progress for search terms updates so there's no regression.)
	//here's the trick. we receive a statusObj serialized via JSON. the eval turns it back into an object.
	eval(request.responseText);

	if (statusObj.message == 'in_progress' && statusObj.terms != ''){
		//because this is an asynchronous call, the server might still be returning status info from the previous query.
		//make sure not to display that.
		if ((!continuedSearch && statusObj.terms != areThereQueryTerms()) ||
			(continuedSearch && statusObj.terms == areThereQueryTerms() && getScopeCode() == statusObj.scope)){

			setSearchTerms(statusObj.terms);
		}
	}
}
