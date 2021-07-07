class Recurso{
    public int id;
    public String desc;
    public int idade;

    public Recurso(int id, String desc, int idade){
        this.id = id;
        this.desc = desc;
        this.idade = idade;
    }

    public int getId(){
        return this.id;
    }

    public String getDesc(){
        return this.desc;
    }

    public int getIdade(){
        return this.idade;
    }

    public Recurso clone(){
        return new Recurso(this.id,this.desc,this.idade);
    }

    public String toString(){
        return "Recurso{" +"ID:"+ this.id +", Desc:" + this.desc + ", Idade ideal: " + this.idade + "}";
    }

}

class Aluno {
    public String id;
    public String nome;
    public int idade;
    public ArrayList<String> caracteristicas;

    public Aluno(String id, String nome, int idade, ArrayList<String> caracteristicas) {
        this.id = id;
        this.nome = nome;
        this.idade = idade;
        this.caracteristicas = caracteristicas;
    }

    public String getId() {
        return this.id;
    }

    public String getNome() {
        return this.nome;
    }

    public int getIdade() {
        return this.idade;
    }

    public ArrayList<String> getCaracteristicas(){
        return this.caracteristicas;
    }

    public boolean equals(String i){
        return (this.id.equals(i));
    }
}

class Conceitos {
    public HashMap<String, HashMap<String, ArrayList<Recurso>>> conceitos;

    public Conceitos() {
        this.conceitos = new HashMap<String, HashMap<String, ArrayList<Recurso>>>();
    }

    public HashMap<String, HashMap<String, ArrayList<Recurso>>> getConceitos() {
        return this.conceitos;
    }

    public void addRecurso(String c, Recurso recurso, ArrayList<String> caracteristicas) {
        if (this.conceitos.containsKey(c)) {
            for (String car : caracteristicas) {
                if (this.conceitos.get(c).containsKey(car)) {
                    this.conceitos.get(c).get(car).add(recurso.clone());
                } else {
                    ArrayList<String> lr = new ArrayList<String>();
                    lr.add(recurso);
                    this.conceitos.get(c).put(car, lr);
                }
            }
        } else {
            HashMap<String, ArrayList<String>> lc = new HashMap<String, ArrayList<String>>();
            for (String car : caracteristicas) {
                ArrayList<String> lr = new ArrayList<String>();
                lr.add(recurso.clone());
                lc.put(car, lr);
            }
            this.conceitos.put(c, lc);
        }
    }

    public ArrayList<Pair<Recurso, Integer>> getRecursos(String conc, Aluno aluno) {
        ArrayList<String> car = aluno.getCaracteristicas();
        HashMap<Recurso, ArrayList<String>> ret = new HashMap<Recurso, ArrayList<String>>();
        for (String c : car) {
            ArrayList<Recurso> rec = this.conceitos.get(conc).get(c);
            if (rec != null) {
                for (Recurso r : rec) {
                    if (ret.containsKey(r))
                        ret.get(r).add(c);
                    else {
                        ArrayList<String> lc = new ArrayList<String>();
                        lc.add(c);
                        ret.put(r, lc);
                    }
                }
            }
        }


        ArrayList<Pair<Recurso, Integer>> re = new HashMap<Recurso, Integer>();

        for (Pair<Recurso, Integer> entry : ret.entrySet()) {
            re.add(new Pair<Recurso, Integer>(entry.getKey(), entry.getValue().size()));
        }
        if (re.size() > 0) {
            Collections.sort(
                    re
                    , new Comparator<Pair<Recurso, Integer>>() {
                        public int compare(Pair<Recurso, Integer> a, Pair<Recurso, Integer> b) {
                            return Integer.compare(b.getValue(), a.getValue());
                        }
                    }
            );


        }
        return re;

    }
}

