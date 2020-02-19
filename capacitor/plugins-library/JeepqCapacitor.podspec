
Pod::Spec.new do |s|
  s.name = 'JeepqCapacitor'
  s.version = '0.0.3-2'
  s.summary = 'Capacitor Plugins Library'
  s.license = 'MIT'
  s.homepage = 'https://github.com/jepiqueau/jeep.git'
  s.author = 'Jean Pierre Quéau'
  s.source = { :git => 'https://github.com/jepiqueau/jeep.git', :tag => s.version.to_s }
  s.source_files = 'ios/Plugin/**/*.{swift,h,m,c,cc,mm,cpp}'
  s.ios.deployment_target  = '11.0'
  s.dependency 'Capacitor'
  s.dependency 'SQLCipher'
end
