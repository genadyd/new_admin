<table class="table table-hover">
    <thead>
    <tr>
        <th scope="col">#</th>
        <th scope="col">name</th>
        <th scope="col">description</th>
        <th scope="col"></th>
    </tr>
    </thead>
    <tbody>
    @foreach($list['categories'] as $cat)
    <tr>
        <td scope="row">{{$cat->id}}</td>
        <td>{{$cat->name}}</td>
        <td>{{$cat->description}}</td>
        <td class="cat_controls">controls</td>
    </tr>
    @endforeach

    </tbody>
</table>
