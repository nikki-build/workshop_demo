import json

person = '{"name": "nikki.build", "languages": ["python", "cpp", "java", "kotlin", "javascript", "nodeJs"]}'
person_dict = json.loads(person)

# Result: {"name": "nikki.build", "languages": ["python", "cpp", "java", "kotlin", "javascript", "nodeJs"]}
print(person_dict)

# Result:  ["python", "cpp", "java", "kotlin", "javascript", "nodeJs"]
print(person_dict['languages'])


person_dict = {
                "name" : "fast and furious"  ,
                "lenght" : 160,
                "rating" : 4.5 
               }
person_json = json.dumps(person_dict)

# Result
print(person_json)
